import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  logo?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, logo }) => {
  return (
    <header className="w-full bg-background border-b py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {logo && <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">A</div>}
        <span className="text-xl font-bold tracking-tight">{title || "Brand"}</span>
      </div>
      <nav className="hidden md:flex items-center gap-2">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">About</Button>
        <Button>Contact</Button>
      </nav>
    </header>
  );
};

