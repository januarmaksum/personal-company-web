"use client";

import React from "react";

import { Settings } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/store/editor/useEditorStore";

export const SiteConfigSection: React.FC = () => {
  const config = useEditorStore((state) => state.config);

  return (
    <div className="mb-6">
      <div className="text-primary mb-3 flex items-center gap-2">
        <Settings size={16} />
        <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
          Site Config
        </h3>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs">Site Title</Label>
          <Input type="text" value={config?.metadata.title || ""} readOnly />
        </div>
      </div>
    </div>
  );
};
