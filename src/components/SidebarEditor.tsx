"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editor/useEditorStore";
import { useShallow } from "zustand/shallow";
import {
  ChevronDown,
  ChevronRight,
  Layout,
  Palette,
  PanelRightClose,
  Plus,
  Save,
  Settings,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

export const SidebarEditor: React.FC = () => {
  const {
    components,
    config,
    updateComponentProps,
    removeComponent,
    domain,
    slug,
    toggleSidebar,
  } = useEditorStore(
    useShallow((state) => ({
      components: state.components,
      config: state.config,
      updateComponentProps: state.updateComponentProps,
      removeComponent: state.removeComponent,
      domain: state.domain,
      slug: state.slug,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedComponent = components.find((c) => c.id === selectedId);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call to json-server
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
    <aside className="w-80 bg-background border-l h-full flex flex-col shadow-xl z-20">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            title="Collapse Sidebar"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelRightClose size={18} />
          </Button>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Editor</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
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
          <Save className={`w-4 h-4 ${isSaving ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {/* Site Config Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Settings size={16} />
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
              Site Config
            </h3>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Site Title</Label>
              <Input
                type="text"
                value={config?.metadata.title || ""}
                readOnly
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Navigator Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary">
              <Layout size={16} />
              <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Navigator
              </h3>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus size={14} />
            </Button>
          </div>

          <div className="space-y-1">
            {components.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  selectedId === comp.id
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      selectedId === comp.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {selectedId === comp.id ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </span>
                  <span className="text-sm">{comp.type}</span>
                </div>
                {!comp.isLocked && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      removeComponent(comp.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inspector Section */}
        {selectedComponent && (
          <>
            <Separator className="my-6" />
            <div>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Palette size={16} />
                <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
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
                        value={selectedComponent.props[propKey]}
                        onChange={(e) =>
                          updateComponentProps(selectedComponent.id, {
                            [propKey]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <div className="text-xs text-muted-foreground italic bg-muted p-2 rounded-md">
                        Nested properties not editable yet
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ScrollArea>
    </aside>
  );
};
