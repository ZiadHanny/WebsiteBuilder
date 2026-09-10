import React from "react";
import type { FooterData, HeaderData, HeroData, Section } from "@/types/blocksTypes";
import EditableHeader from "@/components/blocks/mainNav";
import EditableHero from "@/components/blocks/hero";
import EditableFooter from "@/components/blocks/footer";

interface SectionRendererProps {
  section: Section;
  editing: boolean;
  navData: HeaderData;
  heroData: HeroData;
  footerData: FooterData;
  onNavChange: (data: HeaderData) => void;
  onHeroChange: (data: HeroData) => void;
  onFooterChange: (data: FooterData) => void;
}

/**
 * Maps a section's type to the block component that renders it. Both the
 * builder's edit view and its in-app preview toggle need this exact same
 * mapping (just with `editing` flipped), and so does the standalone
 * /preview route — previously each of those three call sites repeated the
 * same three-way if/else.
 */
export default function SectionRenderer({
  section,
  editing,
  navData,
  heroData,
  footerData,
  onNavChange,
  onHeroChange,
  onFooterChange,
}: SectionRendererProps) {
  switch (section.name) {
    case "Header":
      return <EditableHeader data={navData} onChange={onNavChange} editing={editing} />;
    case "Hero":
      return <EditableHero data={heroData} onChange={onHeroChange} editing={editing} />;
    case "Footer":
      return <EditableFooter data={footerData} onChange={onFooterChange} editing={editing} />;
    default:
      return null;
  }
}
