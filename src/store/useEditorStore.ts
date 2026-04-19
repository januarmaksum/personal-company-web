import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";

export interface ComponentData {
  id: string;
  type: string;
  isLocked: boolean;
  props: Record<string, any>;
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
  
  isSidebarOpen: boolean;
  _hasHydrated: boolean;
  
  // Actions
  setHasHydrated: (state: boolean) => void;
  setPageData: (data: { id: string; domain: string; slug: string; config: PageConfig; components: ComponentData[] }) => void;
  updateComponentProps: (id: string, props: Record<string, any>) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  addComponent: (component: ComponentData) => void;
  removeComponent: (id: string) => void;
  toggleSidebar: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      pageId: null,
      domain: null,
      slug: null,
      config: null,
      components: [],
      isSidebarOpen: true,
      _hasHydrated: false,

      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),

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

      moveComponent: (fromIndex, toIndex) => set((state) => {
        // Prevent moving locked elements
        const compToMove = state.components[fromIndex];
        const targetComp = state.components[toIndex];
        if (compToMove.isLocked || targetComp.isLocked) {
          return state;
        }

        return {
          components: arrayMove(state.components, fromIndex, toIndex)
        };
      }),

      addComponent: (component) => set((state) => ({
        components: [...state.components, component]
      })),

      removeComponent: (id) => set((state) => ({
        components: state.components.filter((c) => c.id !== id)
      })),

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: "tenant-editor-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      // Only persist components and config for drafts
      partialize: (state) => ({
        components: state.components,
        config: state.config,
        pageId: state.pageId
      }),
    }
  )
);
