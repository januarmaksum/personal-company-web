import React from "react";

import { Button } from "@/components/ui/button";

import "./style.css";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ title, logo }) => {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-4 md:px-12">
      <div className="flex items-center gap-3">
        {logo && (
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
            A
          </div>
        )}
        <span className="text-xl font-bold tracking-tight">
          {title || "Brand"}
        </span>
      </div>
      <nav className="hidden items-center gap-2 md:flex">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">About</Button>
        <Button>Contact</Button>
      </nav>
    </header>
  );
};
