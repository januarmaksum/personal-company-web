export interface ComponentData {
  id: string;
  type: string;
  isLocked: boolean;
  props: Record<string, unknown>;
}

export interface PageConfig {
  metadata: {
    title: string;
    description: string;
  };
}

export interface EditorState {
  pageId: string | null;
  domain: string | null;
  slug: string | null;
  theme: string | null;
  config: PageConfig | null;
  components: ComponentData[];

  isSidebarOpen: boolean;
  _hasHydrated: boolean;

  // Actions
  setHasHydrated: (state: boolean) => void;
  setPageData: (data: {
    id: string;
    domain: string;
    slug: string;
    theme?: string;
    config: PageConfig;
    components: ComponentData[];
  }) => void;
  updateComponentProps: (id: string, props: Record<string, unknown>) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  addComponent: (component: ComponentData) => void;
  removeComponent: (id: string) => void;
  toggleSidebar: () => void;
}
