import { TemplateA } from "./TemplateA";

export const TemplateRegistry = {
  TemplateA,
} as const;

export type TemplateType = keyof typeof TemplateRegistry;
export { TemplateA };
