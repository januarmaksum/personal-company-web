import React from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useEditorStore, ComponentData } from "@/store/useEditorStore";
import { Header } from "./tenant/Header";
import { Hero } from "./tenant/Hero";
import { Features } from "./tenant/Features";
import { Footer } from "./tenant/Footer";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ComponentMap = {
  Header,
  Hero,
  Features,
  Footer,
};

interface RendererProps {
  components: ComponentData[];
  editMode?: boolean;
}

export const Renderer: React.FC<RendererProps> = ({ components, editMode }) => {
  const { updateLayout } = useEditorStore();

  const handleLayoutChange = (currentLayout: Layout[]) => {
    if (!editMode) return;
    
    const formattedLayouts = currentLayout.map((l) => ({
      id: l.i,
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h,
    }));
    
    updateLayout(formattedLayouts);
  };

  const layoutConfig = components.map((comp) => ({
    i: comp.id,
    x: comp.layout.x,
    y: comp.layout.y,
    w: comp.layout.w,
    h: comp.layout.h,
    static: comp.isLocked || !editMode,
    isDraggable: !comp.isLocked && editMode,
    isResizable: !comp.isLocked && editMode,
  }));

  if (!editMode) {
    return (
      <div className="flex flex-col w-full">
        {components.sort((a, b) => a.layout.y - b.layout.y).map((component) => {
          const Component = ComponentMap[component.type as keyof typeof ComponentMap];
          if (!Component) return null;
          return <Component key={component.id} {...component.props} />;
        })}
      </div>
    );
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layoutConfig }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      onLayoutChange={handleLayoutChange}
      draggableHandle=".drag-handle"
      margin={[0, 0]}
    >
      {components.map((component) => {
        const Component = ComponentMap[component.type as keyof typeof ComponentMap];
        if (!Component) return <div key={component.id} />;

        return (
          <div key={component.id} className="relative group">
            {!component.isLocked && (
              <div className="drag-handle absolute top-2 left-2 z-10 p-1 bg-white/80 border border-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
              </div>
            )}
            <Component {...component.props} />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

