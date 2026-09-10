"use client";
import React from "react";
import type { BlockStyles, HeroData } from "@/types/blocksTypes";
import { DEFAULT_BLOCK_STYLES } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import ColorStylePicker from "@/components/ui/ColorStylePicker";

interface EditableHeroProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
  editing?: boolean;
}

export default function EditableHero({ data, onChange, editing }: EditableHeroProps) {
  const styles = data.styles ?? DEFAULT_BLOCK_STYLES;

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  return (
    <section
      className="flex h-full min-w-full w-full items-center justify-center px-4 py-16 text-center shadow-inner transition-colors sm:px-6 lg:px-20"
      style={{ backgroundColor: styles.backgroundColor, borderTop: `4px solid ${styles.borderColor}` }}
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-4" style={{ color: styles.textColor }}>
        <EditableText
          value={data.title}
          onChange={(title) => onChange({ ...data, title })}
          editing={editing}
          as="h1"
          className="w-full text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
        />

        <EditableText
          value={data.subtitle}
          onChange={(subtitle) => onChange({ ...data, subtitle })}
          editing={editing}
          as="p"
          multiline
          className="w-full text-center text-sm sm:text-base md:text-lg lg:text-xl"
        />

        <EditableText
          value={data.cta}
          onChange={(cta) => onChange({ ...data, cta })}
          editing={editing}
          as="span"
          className="mt-4 inline-block rounded-2xl bg-white px-6 py-2 font-semibold text-[#0F766E] transition hover:bg-gray-200"
        />

        {editing && <ColorStylePicker styles={styles} onChange={handleStyleChange} />}
      </div>
    </section>
  );
}
