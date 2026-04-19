import React from "react";

import "./styles.css";

interface TemplateAProps {
  children: React.ReactNode;
}

export const TemplateA: React.FC<TemplateAProps> = ({ children }) => {
  return (
    <div className="template-a min-h-screen w-full bg-white transition-colors duration-300">
      {/* Container for components */}
      <div className="mx-auto w-full">{children}</div>
    </div>
  );
};
