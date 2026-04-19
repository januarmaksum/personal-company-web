"use client";

import React, { useState } from "react";

import { PanelRightClose, Save } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor/useEditorStore";

export const EditorHeader: React.FC = () => {
  const { domain, slug, toggleSidebar, config, components } = useEditorStore(
    useShallow((state) => ({
      domain: state.domain,
      slug: state.slug,
      toggleSidebar: state.toggleSidebar,
      config: state.config,
      components: state.components,
    })),
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const pageId = useEditorStore.getState().pageId;
      const data = {
        domain,
        slug,
        config,
        components,
      };

      const res = await fetch(`http://localhost:3001/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Changes saved successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving changes. Is the mock server running?");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background/95 sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          title="Collapse Sidebar"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <PanelRightClose size={18} />
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Editor</h2>
          <p className="text-muted-foreground mt-0.5 text-xs tracking-wider uppercase">
            {domain} / {slug}
          </p>
        </div>
      </div>
      <Button
        onClick={handleSave}
        disabled={isSaving}
        size="icon"
        title="Save Changes"
      >
        <Save className={`h-4 w-4 ${isSaving ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
};
