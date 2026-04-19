import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ComponentData {
  id: string;
  type: string;
  isLocked: boolean;
  props: Record<string, any>;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface PageConfig {
  theme: {
    primary: string;
    font: string;
  };
  metadata: {
    title: string;
    description: string;
  };
}

export interface EditorState {
  pageId: string | null;
  domain: string | null;
  slug: string | null;
  config: PageConfig | null;
  components: ComponentData[];
  
  // Actions
  setPageData: (data: { id: string; domain: string; slug: string; config: PageConfig; components: ComponentData[] }) => void;
  updateComponentProps: (id: string, props: Record<string, any>) => void;
  updateLayout: (layouts: { id: string; x: number; y: number; w: number; h: number }[]) => void;
  addComponent: (component: ComponentData) => void;
  removeComponent: (id: string) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      pageId: null,
      domain: null,
      slug: null,
      config: null,
      components: [],

      setPageData: (data) => set({ 
        pageId: data.id, 
        domain: data.domain, 
        slug: data.slug, 
        config: data.config, 
        components: data.components 
      }),

      updateComponentProps: (id, props) => set((state) => ({
        components: state.components.map((c) => 
          c.id === id ? { ...c, props: { ...c.props, ...props } } : c
        )
      })),

      updateLayout: (layouts) => set((state) => ({
        components: state.components.map((c) => {
          const layout = layouts.find((l) => l.id === c.id);
          return layout ? { ...c, layout: { ...c.layout, ...layout } } : c;
        })
      })),

      addComponent: (component) => set((state) => ({
        components: [...state.components, component]
      })),

      removeComponent: (id) => set((state) => ({
        components: state.components.filter((c) => c.id !== id)
      })),
    }),
    {
      name: "tenant-editor-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist components and config for drafts
      partialize: (state) => ({
        components: state.components,
        config: state.config,
        pageId: state.pageId
      }),
    }
  )
);
