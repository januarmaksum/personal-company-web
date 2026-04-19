"use client";

import React from "react";

import { ChevronDown, ChevronRight, Layout, Plus, Trash2 } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor/useEditorStore";

interface NavigatorSectionProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const NavigatorSection: React.FC<NavigatorSectionProps> = ({
  selectedId,
  onSelect,
}) => {
  const { components, removeComponent } = useEditorStore(
    useShallow((state) => ({
      components: state.components,
      removeComponent: state.removeComponent,
    })),
  );

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

      <div className="space-y-1">
        {components.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onSelect(comp.id)}
            className={`group flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors ${
              selectedId === comp.id
                ? "bg-accent text-accent-foreground font-medium"
                : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  selectedId === comp.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {selectedId === comp.id ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </span>
              <span className="text-sm">{comp.type}</span>
            </div>
            {!comp.isLocked && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  removeComponent(comp.id);
                }}
                className="text-muted-foreground hover:text-destructive h-6 w-6 opacity-0 transition-all group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
