import React from "react";
import { Laptop, Smartphone, Zap, Shield } from "lucide-react";

const IconMap = {
  laptop: Laptop,
  smartphone: Smartphone,
  zap: Zap,
  shield: Shield,
};

interface FeatureItem {
  icon?: string;
  title: string;
  desc: string;
}

interface FeaturesProps {
  title?: string;
  items?: FeatureItem[];
}

export const Features: React.FC<FeaturesProps> = ({ title, items }) => {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title || "Why Choose Us"}
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(items || []).map((item, idx) => {
            const Icon = IconMap[item.icon as keyof typeof IconMap] || Zap;
            return (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
