import React from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useEditorStore, ComponentData } from "@/store/editor/useEditorStore";
import { Header } from "./tenant/Header";
import { Hero } from "./tenant/Hero";
import { Features } from "./tenant/Features";
import { Footer } from "./tenant/Footer";

const ComponentMap = {
  Header,
  Hero,
  Features,
  Footer,
};

interface SortableItemProps {
  id: string;
  component: ComponentData;
  editMode?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, component, editMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id,
    disabled: component.isLocked || !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const ComponentToRender = ComponentMap[component.type as keyof typeof ComponentMap];
  
  if (!ComponentToRender) return null;

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {editMode && !component.isLocked && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute top-4 left-4 z-10 p-2 bg-background border rounded-md shadow-sm cursor-grab opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent text-muted-foreground"
        >
          <GripVertical size={16} />
        </div>
      )}
      <div className={isDragging ? "opacity-50 pointer-events-none" : ""}>
        <ComponentToRender {...component.props} />
      </div>
    </div>
  );
};

interface RendererProps {
  components: ComponentData[];
  editMode?: boolean;
}

export const Renderer: React.FC<RendererProps> = ({ components, editMode }) => {
  const moveComponent = useEditorStore((state) => state.moveComponent);
  const dndId = React.useId();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);
      moveComponent(oldIndex, newIndex);
    }
  };

  if (!editMode) {
    return (
      <div className="flex flex-col w-full min-h-full">
        {components.map((component) => {
          const ComponentToRender = ComponentMap[component.type as keyof typeof ComponentMap];
          if (!ComponentToRender) return null;
          return <ComponentToRender key={component.id} {...component.props} />;
        })}
      </div>
    );
  }

  const items = components.map(c => c.id);

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col w-full min-h-full">
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {components.map((component) => (
            <SortableItem 
              key={component.id} 
              id={component.id} 
              component={component} 
              editMode={editMode}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

