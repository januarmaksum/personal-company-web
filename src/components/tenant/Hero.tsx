import React from "react";

import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  return (
    <section className="bg-background flex w-full flex-col items-center px-6 py-20 text-center md:px-12">
      <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
        {title || "Default Hero Title"}
      </h1>
      <p className="text-muted-foreground mb-10 max-w-2xl text-lg md:text-xl">
        {subtitle ||
          "This is a default subtitle for your landing page section."}
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
