import React from "react";

interface FooterProps {
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-muted text-muted-foreground border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">A</div>
          <span className="text-xl font-bold tracking-tight text-foreground">AgencyOne</span>
        </div>
        
        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
        </div>
        
        <div className="text-sm">
          {copyright || "© 2026 AgencyOne. All rights reserved."}
        </div>
      </div>
    </footer>
  );
};
