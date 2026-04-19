import React from "react";
import { Laptop, Smartphone, Zap, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
    <section className="w-full py-24 px-6 md:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title || "Why Choose Us"}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(items || []).map((item, idx) => {
            const Icon = IconMap[item.icon as keyof typeof IconMap] || Zap;
            return (
              <Card key={idx} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-none shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
