import React from "react";

interface FooterProps {
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold tracking-tight text-white">AgencyOne</span>
        </div>
        
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
        
        <div className="text-sm">
          {copyright || "© 2026 AgencyOne. All rights reserved."}
        </div>
      </div>
    </footer>
  );
};
