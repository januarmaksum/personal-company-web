"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Dynamic imports for code splitting
const EditorHeader = dynamic(
  () => import("./editor/EditorHeader").then((mod) => mod.EditorHeader),
  { ssr: false },
);
const SiteConfigSection = dynamic(
  () =>
    import("./editor/SiteConfigSection").then((mod) => mod.SiteConfigSection),
  { ssr: false },
);
const NavigatorSection = dynamic(
  () => import("./editor/NavigatorSection").then((mod) => mod.NavigatorSection),
  { ssr: false },
);
const InspectorSection = dynamic(
  () => import("./editor/InspectorSection").then((mod) => mod.InspectorSection),
  { ssr: false },
);

export const SidebarEditor: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <aside className="bg-background z-20 flex h-full w-80 flex-col border-l shadow-xl">
      <EditorHeader />

      <ScrollArea className="flex-1 p-4">
        <SiteConfigSection />

        <Separator className="my-6" />

        <NavigatorSection selectedId={selectedId} onSelect={setSelectedId} />

        <InspectorSection selectedId={selectedId} />
      </ScrollArea>
    </aside>
  );
};
