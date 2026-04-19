"use client";

import {
  ComponentData,
  PageConfig,
  useEditorStore,
} from "@/store/editor/useEditorStore";
import { Settings } from "lucide-react";
import React, { useEffect, useRef } from "react";
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
      className={`flex flex-col h-screen overflow-hidden ${editMode ? "bg-gray-100" : "bg-white"}`}
    >
      {editMode && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-xs font-bold uppercase tracking-widest z-30 relative">
          Builder Mode Active: {initialData.domain}/{initialData.slug}
        </div>
      )}

      <div
        className={editMode ? "flex-1 flex overflow-hidden h-full" : "w-full"}
      >
        {/* Main Canvas Area */}
        <div
          className={`flex-1 overflow-y-auto relative ${editMode ? "bg-gray-50" : ""}`}
        >
          <div
            className={
              editMode
                ? "w-full bg-white min-h-screen shadow-sm transition-all duration-300"
                : "w-full"
            }
          >
            <Renderer components={activeComponents} editMode={editMode} />
          </div>

          {/* Floating Toggle to show sidebar when it's closed */}
          {editMode && !isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-3 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-2 group"
              title="Show Editor"
            >
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-sm font-bold pr-1">Show Editor</span>
            </button>
          )}
        </div>

        {/* Sidebar */}
        {editMode && (
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden border-l bg-background shadow-xl ${
              isSidebarOpen ? "w-80" : "w-0 border-l-0 shadow-none"
            }`}
          >
            <div className="w-80 h-full">
              <SidebarEditor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
