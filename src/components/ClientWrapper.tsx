"use client";

import React, { useEffect, useState } from "react";
import { useEditorStore, PageConfig, ComponentData } from "@/store/useEditorStore";
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

export const ClientWrapper: React.FC<ClientWrapperProps> = ({ initialData, editMode }) => {
  const { setPageData, components, config } = useEditorStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setPageData(initialData);
    setIsInitialized(true);
  }, [initialData, setPageData]);

  // Use the data from Zustand if available, otherwise fallback to SSR data
  const activeComponents = isInitialized ? components : initialData.components;
  const activeConfig = isInitialized ? config : initialData.config;

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${editMode ? "bg-gray-100" : "bg-white"}`}>
      {editMode && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-xs font-bold uppercase tracking-widest z-30">
          Builder Mode Active: {initialData.domain}/{initialData.slug}
        </div>
      )}
      
      <div className={editMode ? "flex-1 flex overflow-hidden h-[calc(100vh-32px)]" : "w-full"}>
        {/* Main Canvas Area */}
        <div className={`flex-1 overflow-y-auto ${editMode ? "p-8 md:p-12" : ""}`}>
          <div className={editMode ? "max-w-5xl mx-auto bg-white shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[90vh] border border-gray-200" : "w-full"}>
            <Renderer components={activeComponents} editMode={editMode} />
          </div>
        </div>

        {/* Sidebar */}
        {editMode && <SidebarEditor />}
      </div>
    </div>
  );
};

