"use client";

import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ComponentData } from "@/store/editor/useEditorStore";

interface NavigatorItemProps {
  comp: ComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export const NavigatorItem: React.FC<NavigatorItemProps> = ({
  comp,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: comp.id,
    disabled: comp.isLocked,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete the "${comp.type}" component?`,
    );
    if (confirmed) {
      onRemove(comp.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between rounded-md p-2 transition-colors ${
        isSelected
          ? "bg-accent text-accent-foreground font-medium"
          : "hover:bg-muted text-muted-foreground"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className={`cursor-grab p-1 transition-colors hover:text-foreground ${
            isSelected ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <GripVertical size={14} />
        </div>
        <span className="text-sm">{comp.type}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSelect(comp.id)}
          className={`h-6 w-6 cursor-pointer transition-all ${
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Pencil size={14} />
        </Button>
        {!comp.isLocked && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive h-6 w-6 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>
    </div>
  );
};
