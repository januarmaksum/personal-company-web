"use client";

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
import { Layout, Plus } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor/useEditorStore";

import { NavigatorItem } from "./NavigatorItem";

interface NavigatorSectionProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const NavigatorSection: React.FC<NavigatorSectionProps> = ({
  selectedId,
  onSelect,
}) => {
  const { components, removeComponent, moveComponent } = useEditorStore(
    useShallow((state) => ({
      components: state.components,
      removeComponent: state.removeComponent,
      moveComponent: state.moveComponent,
    })),
  );

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

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-primary flex items-center gap-2">
          <Layout size={16} />
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Navigator
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus size={14} />
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-1">
          <SortableContext
            items={components.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {components.map((comp) => (
              <NavigatorItem
                key={comp.id}
                comp={comp}
                isSelected={selectedId === comp.id}
                onSelect={(id) => onSelect(id)}
                onRemove={(id) => removeComponent(id)}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};
