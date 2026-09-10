// types.ts

export interface BlockStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  /** Data URL or external URL. Empty string means "use backgroundColor instead". */
  backgroundImage?: string;
  /** 0-100, how dark the overlay over a background image is, kept as a string like the rest of BlockStyles. */
  backgroundOverlay?: string;
}

export const DEFAULT_BLOCK_STYLES: BlockStyles = {
  backgroundColor: "#0F766E",
  textColor: "#FFFFFF",
  borderColor: "#0F766E",
  backgroundImage: "",
  backgroundOverlay: "40",
};

export type TextAnimation = "none" | "fade-in" | "fade-up" | "zoom-in";

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeaderData {
  Logo: string;
  links: LinkItem[];
  button: string;
  styles: BlockStyles;
  animation: TextAnimation;
}

export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  /** Optional side image; when empty the hero stays a centered text banner. */
  image: string;
  styles: BlockStyles;
  animation: TextAnimation;
}

export interface FeatureItem {
  title: string;
  text: string;
}

export interface FeaturesData {
  heading: string;
  items: FeatureItem[];
  styles: BlockStyles;
  animation: TextAnimation;
}

export interface ContentData {
  heading: string;
  text: string;
  image: string;
  imagePosition: "left" | "right";
  styles: BlockStyles;
  animation: TextAnimation;
}

export interface GalleryData {
  heading: string;
  images: string[];
  styles: BlockStyles;
  animation: TextAnimation;
}

export interface FooterData {
  text: string;
  links: LinkItem[];
  styles: BlockStyles;
  animation: TextAnimation;
}

/** The block types a page can be built from. */
export type SectionName = "Header" | "Hero" | "Features" | "Content" | "Gallery" | "Footer";

export type SectionData = HeaderData | HeroData | FeaturesData | ContentData | GalleryData | FooterData;

/**
 * Discriminated on `name` so a `switch` over it (see SectionRenderer) narrows
 * `data` to the matching type without casts at the render call sites.
 */
export type Section =
  | { id: string; name: "Header"; data: HeaderData }
  | { id: string; name: "Hero"; data: HeroData }
  | { id: string; name: "Features"; data: FeaturesData }
  | { id: string; name: "Content"; data: ContentData }
  | { id: string; name: "Gallery"; data: GalleryData }
  | { id: string; name: "Footer"; data: FooterData };

/** Everything needed to reconstruct a built page. */
export interface BuilderData {
  sections: Section[];
}
