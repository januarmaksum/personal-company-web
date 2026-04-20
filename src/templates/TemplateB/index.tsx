import React from "react";

import {
  ArrowRight,
  Headphones,
  Mail,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import "./styles.css";

// DUMMY DATA
const PRODUCTS = [
  {
    id: 1,
    title: "Modern Desk Lamp",
    price: 89.99,
    image: "Lamp",
    category: "Lighting",
  },
  {
    id: 2,
    title: "Ergonomic Chair",
    price: 299.99,
    image: "Chair",
    category: "Furniture",
  },
  {
    id: 3,
    title: "Noise Cancelling Headphones",
    price: 199.99,
    image: "Audio",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Smart Watch Elite",
    price: 149.99,
    image: "Watch",
    category: "Tech",
  },
];

const CATEGORIES = [
  { id: 1, name: "Electronics", count: 120, icon: "Smartphone" },
  { id: 2, name: "Fashion", count: 450, icon: "Shirt" },
  { id: 3, name: "Home Decor", count: 85, icon: "Home" },
  { id: 4, name: "Accessories", count: 210, icon: "Watch" },
];

const FEATURES = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Shipping",
    desc: "For orders over $100",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Secure Payment",
    desc: "100% secure payment",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "24/7 Support",
    desc: "Dedicated support team",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Best Quality",
    desc: "Handpicked artifacts",
  },
];

interface TemplateBProps {
  children?: React.ReactNode;
}

export const TemplateB: React.FC<TemplateBProps> = ({ children }) => {
  return (
    <div className="template-b min-h-screen w-full bg-white text-[#222831]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="text-2xl font-bold tracking-tight text-[#222831]">
              MODERN<span className="text-[#00ADB5]">SHOP</span>
            </div>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-[#00ADB5]"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-[#00ADB5]"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-[#00ADB5]"
            >
              Deals
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-[#00ADB5]"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#393E46]" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] bg-[#EEEEEE] pl-9 border-none focus-visible:ring-1 focus-visible:ring-[#00ADB5] lg:w-[300px]"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00ADB5] text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#EEEEEE] py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00ADB5] shadow-sm">
              Summer Collection 2026
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-[#222831] sm:text-6xl lg:text-7xl">
              Elevate Your Everyday{" "}
              <span className="text-[#00ADB5]">Essentials</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#393E46] sm:text-1xl">
              Experience the perfect blend of minimalist design and maximum
              functionality. Our new collection is crafted for the modern
              lifestyle.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-[#00ADB5] px-8 hover:bg-[#00979e]"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 border-[#222831] text-[#222831] hover:bg-[#222831] hover:text-white"
              >
                View Lookbook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BANNER (CARD INFO) */}
      <section className="border-y bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EEEEEE] text-[#00ADB5]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#222831]">{feature.title}</h3>
                  <p className="text-sm text-[#393E46]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#222831]">
                Latest Products
              </h2>
              <p className="mt-2 text-[#393E46]">
                Our most recent drops you don&apos;t want to miss.
              </p>
            </div>
            <Button variant="link" className="text-[#00ADB5] p-0 font-bold">
              View all products <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-none shadow-none bg-transparent"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#EEEEEE] transition-all group-hover:shadow-lg">
                    {/* Image Placeholder */}
                    <div className="flex h-full w-full items-center justify-center text-[#393E46]">
                      <span className="font-semibold">
                        {product.image} Preview
                      </span>
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 h-10 w-10 translate-y-12 bg-[#00ADB5] opacity-0 transition-all hover:bg-[#00979e] group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pt-4">
                  <div className="mb-1 text-xs font-medium text-[#00ADB5] uppercase tracking-wide">
                    {product.category}
                  </div>
                  <CardTitle className="text-lg font-bold text-[#222831] group-hover:text-[#00ADB5] transition-colors line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-bold text-[#222831]">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="ml-1 text-xs text-[#393E46]">4.8</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0 pb-0">
                  <Button className="w-full bg-[#222831] text-white hover:bg-[#393E46]">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[#222831] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-[#EEEEEE]/70">
              Find exactly what you&apos;re looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href="#"
                className="group relative h-40 overflow-hidden rounded-2xl bg-[#393E46] transition-transform hover:-translate-y-1"
              >
                <div className="flex h-full flex-col items-center justify-center p-6 transition-colors group-hover:bg-[#00ADB5]">
                  <div className="mb-3 text-2xl font-bold">{cat.name}</div>
                  <div className="text-sm text-[#EEEEEE]/50 group-hover:text-white/80">
                    {cat.count} Artifacts
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#00ADB5] px-6 py-12 text-white sm:px-12 lg:py-16">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <Mail className="mx-auto h-12 w-12 mb-6" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Get notified about new collections and exclusive discounts.
              </p>
              <form className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 border-none bg-white text-[#222831] placeholder:text-[#393E46]/50 focus-visible:ring-0"
                />
                <Button
                  size="lg"
                  className="h-12 bg-[#222831] text-white hover:bg-[#393E46]"
                >
                  Subscribe
                </Button>
              </form>
              <p className="mt-4 text-xs text-white/50">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#222831] pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="text-2xl font-bold tracking-tight">
                MODERN<span className="text-[#00ADB5]">SHOP</span>
              </div>
              <p className="mt-4 text-sm text-[#EEEEEE]/70">
                Premium quality goods for the modern professional. Design-led
                and sustainably sourced artifacts.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="text-[#EEEEEE]/70 hover:text-[#00ADB5]"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-[#EEEEEE]/70 hover:text-[#00ADB5]"
                  aria-label="X (Twitter)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-[#EEEEEE]/70 hover:text-[#00ADB5]"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.173.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 2.247a3.915 3.915 0 1 1 0 7.83 3.915 3.915 0 0 1 0-7.83Zm6.564-4.225a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0Z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold">Shop</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#EEEEEE]/70">
                <li>
                  <a href="#" className="hover:text-white">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#EEEEEE]/70">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#EEEEEE]/70">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 border-t border-[#393E46] pt-10 text-center text-sm text-[#EEEEEE]/30">
            &copy; 2026 MODERN SHOP. All rights reserved. Built with precision.
          </div>
        </div>
      </footer>

      {/* Main content from Renderer if any */}
      {children && (
        <div className="template-content-overlay hidden">{children}</div>
      )}
    </div>
  );
};
