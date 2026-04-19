"use client";

import React from "react";

import { Palette } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editor/useEditorStore";

interface InspectorSectionProps {
  selectedId: string | null;
}

export const InspectorSection: React.FC<InspectorSectionProps> = ({
  selectedId,
}) => {
  const { components, updateComponentProps } = useEditorStore(
    useShallow((state) => ({
      components: state.components,
      updateComponentProps: state.updateComponentProps,
    })),
  );

  const selectedComponent = components.find((c) => c.id === selectedId);

  if (!selectedComponent) return null;

  return (
    <>
      <Separator className="my-6" />
      <div>
        <div className="text-primary mb-4 flex items-center gap-2">
          <Palette size={16} />
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Inspector
          </h3>
        </div>

        <div className="space-y-4">
          {Object.keys(selectedComponent.props).map((propKey) => (
            <div key={propKey} className="space-y-1">
              <Label className="text-xs uppercase">{propKey}</Label>
              {typeof selectedComponent.props[propKey] === "string" ? (
                <Input
                  type="text"
                  value={selectedComponent.props[propKey] as string}
                  onChange={(e) =>
                    updateComponentProps(selectedComponent.id, {
                      [propKey]: e.target.value,
                    })
                  }
                />
              ) : (
                <div className="text-muted-foreground bg-muted rounded-md p-2 text-xs italic">
                  Nested properties not editable yet
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
