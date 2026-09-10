import React from "react";
import type { Section, SectionData } from "@/types/blocksTypes";
import EditableHeader from "@/components/blocks/mainNav";
import EditableHero from "@/components/blocks/hero";
import EditableFeatures from "@/components/blocks/features";
import EditableContent from "@/components/blocks/content";
import EditableGallery from "@/components/blocks/gallery";
import EditableFooter from "@/components/blocks/footer";

interface SectionRendererProps {
  section: Section;
  editing: boolean;
  onChange: (data: SectionData) => void;
}

/**
 * Maps a section's type to the block component that renders it. `section`
 * being a discriminated union (on `name`) is what lets each branch below
 * narrow `section.data` to the right shape without a cast. The builder's
 * edit view, its in-app preview toggle, and the standalone /preview route
 * all share this exact mapping — previously each repeated the same switch.
 */
export default function SectionRenderer({ section, editing, onChange }: SectionRendererProps) {
  switch (section.name) {
    case "Header":
      return <EditableHeader data={section.data} onChange={onChange} editing={editing} />;
    case "Hero":
      return <EditableHero data={section.data} onChange={onChange} editing={editing} />;
    case "Features":
      return <EditableFeatures data={section.data} onChange={onChange} editing={editing} />;
    case "Content":
      return <EditableContent data={section.data} onChange={onChange} editing={editing} />;
    case "Gallery":
      return <EditableGallery data={section.data} onChange={onChange} editing={editing} />;
    case "Footer":
      return <EditableFooter data={section.data} onChange={onChange} editing={editing} />;
    default:
      return null;
  }
}
