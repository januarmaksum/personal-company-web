import React from "react";

interface HeaderProps {
  title?: string;
  logo?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, logo }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        {logo && <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>}
        <span className="text-xl font-bold tracking-tight text-gray-900">{title || "Brand"}</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
        <a href="#" className="hover:text-blue-600 transition-colors">About</a>
        <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Contact</a>
      </nav>
    </header>
  );
};
