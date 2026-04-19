import { ComponentData } from "@/store/editor/useEditorStore";

export interface RendererProps {
  components: ComponentData[];
  editMode?: boolean;
}
