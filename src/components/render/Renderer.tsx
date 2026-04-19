import React from "react";

import { useEditorStore } from "@/store/editor/useEditorStore";
import { TemplateRegistry } from "@/templates";

import { ComponentMap } from "./ComponentMap";
import { RendererProps } from "./types";

export const Renderer: React.FC<RendererProps> = ({ components }) => {
  const theme = useEditorStore((state) => state.theme);

  const Template =
    TemplateRegistry[theme as keyof typeof TemplateRegistry] ||
    TemplateRegistry.TemplateA;

  const content = (
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
