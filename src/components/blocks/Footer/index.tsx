import React from "react";

import "./style.css";
import { FooterProps } from "./types";

export const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className="bg-muted text-muted-foreground w-full border-t px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-lg font-bold">
            A
          </div>
          <span className="text-foreground text-xl font-bold tracking-tight">
            AgencyOne
          </span>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Cookies
          </a>
        </div>

        <div className="text-sm">
          {copyright || "© 2026 AgencyOne. All rights reserved."}
        </div>
      </div>
    </footer>
  );
};
