import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { ComponentMap } from "./ComponentMap";
import { SortableItemProps } from "./types";

export const SortableItem: React.FC<SortableItemProps> = ({
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
