import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { EditorState } from "./types";

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

      setPageData: (data) =>
        set({
          pageId: data.id,
          domain: data.domain,
          slug: data.slug,
          config: data.config,
          components: data.components,
        }),

      updateComponentProps: (id, props) =>
        set((state) => ({
          components: state.components.map((c) =>
            c.id === id ? { ...c, props: { ...c.props, ...props } } : c,
          ),
        })),

      moveComponent: (fromIndex, toIndex) =>
        set((state) => {
          // Prevent moving locked elements
          const compToMove = state.components[fromIndex];
          const targetComp = state.components[toIndex];
          if (compToMove.isLocked || targetComp.isLocked) {
            return state;
          }

          return {
            components: arrayMove(state.components, fromIndex, toIndex),
          };
        }),

      addComponent: (component) =>
        set((state) => ({
          components: [...state.components, component],
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
        })),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
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
        pageId: state.pageId,
      }),
    },
  ),
);

// Export types for convenience
export * from "./types";
