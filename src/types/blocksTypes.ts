// types.ts

export interface BlockStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export const DEFAULT_BLOCK_STYLES: BlockStyles = {
  backgroundColor: "#0F766E",
  textColor: "#FFFFFF",
  borderColor: "#0F766E",
};

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeaderData {
  Logo: string;
  links: LinkItem[];
  button: string;
  styles?: BlockStyles;
}

export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  styles?: BlockStyles;
}

export interface FooterData {
  text: string;
  links: LinkItem[];
  styles?: BlockStyles;
}

/** The three block types a page can be built from. */
export type SectionName = "Header" | "Hero" | "Footer";

export interface Section {
  id: string;
  name: SectionName;
}

/** Everything needed to reconstruct a built page: layout + each block's content. */
export interface BuilderData {
  sections: Section[];
  navData: HeaderData;
  heroData: HeroData;
  footerData: FooterData;
}
