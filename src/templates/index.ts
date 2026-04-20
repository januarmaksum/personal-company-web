import { TemplateA } from "./TemplateA";
import { TemplateB } from "./TemplateB";

export const TemplateRegistry = {
  TemplateA,
  TemplateB,
} as const;

export type TemplateType = keyof typeof TemplateRegistry;
export { TemplateA, TemplateB };
