import { ComponentData } from "@/store/editor/useEditorStore";

export interface SortableItemProps {
  id: string;
  component: ComponentData;
  editMode?: boolean;
}

export interface RendererProps {
  components: ComponentData[];
  editMode?: boolean;
}
