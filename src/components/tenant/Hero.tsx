import React from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-white flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl">
        {title || "Default Hero Title"}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
        {subtitle || "This is a default subtitle for your landing page section."}
      </p>
      <div className="flex gap-4">
        <a 
          href={ctaLink || "#"} 
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200"
        >
          {ctaText || "Get Started"}
        </a>
        <a 
          href="#" 
          className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};
