import type {
  ContentData,
  FeaturesData,
  FooterData,
  GalleryData,
  HeaderData,
  HeroData,
  Section,
  SectionData,
  SectionName,
} from "@/types/blocksTypes";
import { DEFAULT_BLOCK_STYLES } from "@/types/blocksTypes";

export const SECTION_INFO: Record<SectionName, { tag: string; description: string; unique: boolean }> = {
  Header: { tag: "Navigation", description: "Navigation bar with a logo and menu links.", unique: true },
  Hero: { tag: "Content", description: "A big introduction banner, with an optional side image.", unique: false },
  Features: { tag: "Content", description: "A grid of feature cards, each with a title and text.", unique: false },
  Content: { tag: "Content", description: "A heading and text next to an image, either side.", unique: false },
  Gallery: { tag: "Media", description: "A grid of images.", unique: false },
  Footer: { tag: "Content", description: "Links and copyright, at the bottom of the page.", unique: true },
};

export const SECTION_NAMES = Object.keys(SECTION_INFO) as SectionName[];

function createDefaultStyles() {
  return { ...DEFAULT_BLOCK_STYLES };
}

/** The starting content for a freshly-added section of the given type. */
export function createDefaultSectionData(name: SectionName): SectionData {
  switch (name) {
    case "Header":
      return {
        Logo: "MyLogo",
        links: [
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
        button: "Sign In",
        styles: createDefaultStyles(),
        animation: "none",
      } satisfies HeaderData;
    case "Hero":
      return {
        title: "Welcome to MySite",
        subtitle: "Build beautiful pages easily with the visual builder.",
        cta: "Get Started",
        image: "",
        styles: createDefaultStyles(),
        animation: "fade-up",
      } satisfies HeroData;
    case "Features":
      return {
        heading: "Why choose us",
        items: [
          { title: "Fast", text: "Built for speed from day one." },
          { title: "Flexible", text: "Every section is fully editable." },
          { title: "Reliable", text: "Your work saves automatically as you go." },
        ],
        styles: createDefaultStyles(),
        animation: "fade-up",
      } satisfies FeaturesData;
    case "Content":
      return {
        heading: "Tell your story",
        text: "Add a heading, some text, and an image to explain a feature or idea in more depth.",
        image: "",
        imagePosition: "right",
        styles: createDefaultStyles(),
        animation: "fade-up",
      } satisfies ContentData;
    case "Gallery":
      return {
        heading: "Gallery",
        images: [],
        styles: createDefaultStyles(),
        animation: "fade-up",
      } satisfies GalleryData;
    case "Footer":
      return {
        text: "© 2025 MySite. All rights reserved.",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms", href: "#" },
        ],
        styles: createDefaultStyles(),
        animation: "fade-in",
      } satisfies FooterData;
    default: {
      const exhaustiveCheck: never = name;
      throw new Error(`Unknown section type: ${exhaustiveCheck}`);
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

/**
 * Turns whatever was parsed from localStorage or an imported file into a
 * clean `Section[]`, filling in any field missing from `defaults` (which
 * happens for a page saved before an upgrade added it, e.g. `animation` or
 * `backgroundImage`) and, for pages saved before sections carried their own
 * `data`, reading each block's content back out of the old top-level
 * `navData`/`heroData`/`footerData` fields instead.
 */
export function normalizeSections(raw: unknown): Section[] {
  if (!isRecord(raw) || !Array.isArray(raw.sections)) return [];

  return raw.sections
    .filter((s): s is Record<string, unknown> => isRecord(s) && typeof s.name === "string" && s.name in SECTION_INFO)
    .map((s) => {
      const name = s.name as SectionName;
      const defaults = createDefaultSectionData(name);
      const legacyData =
        name === "Header" ? raw.navData : name === "Hero" ? raw.heroData : name === "Footer" ? raw.footerData : undefined;
      const source = isRecord(s.data) ? s.data : isRecord(legacyData) ? legacyData : {};
      const styles = isRecord(source.styles) ? { ...defaults.styles, ...source.styles } : defaults.styles;

      return {
        id: typeof s.id === "string" ? s.id : crypto.randomUUID(),
        name,
        data: { ...defaults, ...source, styles },
      } as Section;
    });
}
