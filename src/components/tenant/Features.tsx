import React from "react";

import { Laptop, Shield, Smartphone, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <section className="bg-muted/30 w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title || "Why Choose Us"}
          </h2>
          <div className="bg-primary mx-auto h-1.5 w-20 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(items || []).map((item, idx) => {
            const Icon = IconMap[item.icon as keyof typeof IconMap] || Zap;
            return (
              <Card
                key={idx}
                className="border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
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
