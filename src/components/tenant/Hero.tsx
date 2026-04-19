import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-background flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
        {title || "Default Hero Title"}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
        {subtitle || "This is a default subtitle for your landing page section."}
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild className="rounded-full shadow-lg">
          <a href={ctaLink || "#"}>{ctaText || "Get Started"}</a>
        </Button>
        <Button size="lg" variant="outline" asChild className="rounded-full">
          <a href="#">Learn More</a>
        </Button>
      </div>
    </section>
  );
};

