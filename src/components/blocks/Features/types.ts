export interface FeatureItem {
  icon?: string;
  title: string;
  desc: string;
}

export interface FeaturesProps {
  title?: string;
  items?: FeatureItem[];
}
