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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEditorStore } from "@/store/editor/useEditorStore";
import { TemplateRegistry } from "@/templates";

import { ComponentMap } from "./ComponentMap";
import { SortableItem } from "./SortableItem";
import { RendererProps } from "./types";

export const Renderer: React.FC<RendererProps> = ({ components, editMode }) => {
  const moveComponent = useEditorStore((state) => state.moveComponent);
  const theme = useEditorStore((state) => state.theme);
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

  const Template =
    TemplateRegistry[theme as keyof typeof TemplateRegistry] ||
    TemplateRegistry.TemplateA;

  const content = editMode ? (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex min-h-full w-full flex-col">
        <SortableContext
          items={components.map((c) => c.id)}
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
  ) : (
    <div className="flex min-h-full w-full flex-col">
      {components.map((component) => {
        const ComponentToRender =
          ComponentMap[component.type as keyof typeof ComponentMap];
        if (!ComponentToRender) return null;
        return <ComponentToRender key={component.id} {...component.props} />;
      })}
    </div>
  );

  return <Template>{content}</Template>;
};
