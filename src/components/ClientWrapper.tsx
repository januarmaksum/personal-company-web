"use client";

import React, { useEffect, useRef } from "react";

import { Settings } from "lucide-react";

import {
  ComponentData,
  PageConfig,
  useEditorStore,
} from "@/store/editor/useEditorStore";

import { Renderer } from "./Renderer";
import { SidebarEditor } from "./SidebarEditor";

interface ClientWrapperProps {
  initialData: {
    id: string;
    domain: string;
    slug: string;
    config: PageConfig;
    components: ComponentData[];
  };
  editMode: boolean;
}

export const ClientWrapper: React.FC<ClientWrapperProps> = ({
  initialData,
  editMode,
}) => {
  const setPageData = useEditorStore((state) => state.setPageData);
  const components = useEditorStore((state) => state.components);
  const isSidebarOpen = useEditorStore((state) => state.isSidebarOpen);
  const toggleSidebar = useEditorStore((state) => state.toggleSidebar);
  const hasHydrated = useEditorStore((state) => state._hasHydrated);
  const storePageId = useEditorStore((state) => state.pageId);

  const lastSyncedId = useRef<string | null>(null);

  useEffect(() => {
    // Best practice: Only sync if the data has actually changed (by ID)
    // to avoid infinite re-render loops when the store updates.
    if (lastSyncedId.current !== initialData.id) {
      setPageData(initialData);
      lastSyncedId.current = initialData.id;
    }
  }, [initialData, setPageData]);

  // Use the data from Zustand if hydrated and matches current page, otherwise fallback to SSR data
  const canUseStore = hasHydrated && storePageId === initialData.id;
  const activeComponents = canUseStore ? components : initialData.components;

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden ${editMode ? "bg-gray-100" : "bg-white"}`}
    >
      {editMode && (
        <div className="relative z-30 bg-blue-600 px-4 py-2 text-center text-xs font-bold tracking-widest text-white uppercase">
          Builder Mode Active: {initialData.domain}/{initialData.slug}
        </div>
      )}

      <div
        className={editMode ? "flex h-full flex-1 overflow-hidden" : "w-full"}
      >
        {/* Main Canvas Area */}
        <div
          className={`relative flex-1 overflow-y-auto ${editMode ? "bg-gray-50" : ""}`}
        >
          <div
            className={
              editMode
                ? "min-h-screen w-full bg-white shadow-sm transition-all duration-300"
                : "w-full"
            }
          >
            <Renderer components={activeComponents} editMode={editMode} />
          </div>

          {/* Floating Toggle to show sidebar when it's closed */}
          {editMode && !isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="bg-primary text-primary-foreground group fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full p-3 shadow-2xl transition-transform hover:scale-110"
              title="Show Editor"
            >
              <Settings className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
              <span className="pr-1 text-sm font-bold">Show Editor</span>
            </button>
          )}
        </div>

        {/* Sidebar */}
        {editMode && (
          <div
            className={`bg-background overflow-hidden border-l shadow-xl transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "w-80" : "w-0 border-l-0 shadow-none"
            }`}
          >
            <div className="h-full w-80">
              <SidebarEditor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
