import dynamic from "next/dynamic";

export const ComponentMap = {
  Header: dynamic(() => import("../blocks/Header").then((mod) => mod.Header)),
  Hero: dynamic(() => import("../blocks/Hero").then((mod) => mod.Hero)),
  Features: dynamic(() =>
    import("../blocks/Features").then((mod) => mod.Features),
  ),
  Footer: dynamic(() => import("../blocks/Footer").then((mod) => mod.Footer)),
};
