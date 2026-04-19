import React from "react";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { ComponentData, useEditorStore } from "@/store/editor/useEditorStore";

import { Features } from "./tenant/Features";
import { Footer } from "./tenant/Footer";
import { Header } from "./tenant/Header";
import { Hero } from "./tenant/Hero";

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

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  component,
  editMode,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: component.isLocked || !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const ComponentToRender =
    ComponentMap[component.type as keyof typeof ComponentMap];

  if (!ComponentToRender) return null;

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {editMode && !component.isLocked && (
        <div
          {...attributes}
          {...listeners}
          className="bg-background hover:bg-accent text-muted-foreground absolute top-4 left-4 z-10 cursor-grab rounded-md border p-2 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        >
          <GripVertical size={16} />
        </div>
      )}
      <div className={isDragging ? "pointer-events-none opacity-50" : ""}>
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
    useSensor(KeyboardSensor),
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
      <div className="flex min-h-full w-full flex-col">
        {components.map((component) => {
          const ComponentToRender =
            ComponentMap[component.type as keyof typeof ComponentMap];
          if (!ComponentToRender) return null;
          return <ComponentToRender key={component.id} {...component.props} />;
        })}
      </div>
    );
  }

  const items = components.map((c) => c.id);

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex min-h-full w-full flex-col">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
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
