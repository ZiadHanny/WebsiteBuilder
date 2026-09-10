"use client";
import React from "react";
import type { BlockStyles, HeroData } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import ImagePicker from "@/components/ui/ImagePicker";
import SectionControls from "@/components/ui/SectionControls";
import AnimatedBlock from "@/components/ui/AnimatedBlock";
import { getSectionBackgroundStyle } from "@/utils/sectionStyle";

interface EditableHeroProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
  editing?: boolean;
}

export default function EditableHero({ data, onChange, editing }: EditableHeroProps) {
  const styles = data.styles;
  const hasImage = Boolean(data.image);

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  return (
    <section
      className="flex h-full min-w-full w-full items-center justify-center px-4 py-16 shadow-inner transition-colors sm:px-6 lg:px-20"
      style={getSectionBackgroundStyle(styles)}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <AnimatedBlock
          animation={data.animation}
          editing={editing}
          className={`flex w-full flex-col items-center gap-6 text-center ${hasImage ? "md:flex-row md:text-left" : ""}`}
          style={{ color: styles.textColor }}
        >
          <div className={`flex flex-col items-center gap-4 ${hasImage ? "flex-1 md:items-start" : "mx-auto w-full max-w-4xl"}`}>
            <EditableText
              value={data.title}
              onChange={(title) => onChange({ ...data, title })}
              editing={editing}
              as="h1"
              className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
            />

            <EditableText
              value={data.subtitle}
              onChange={(subtitle) => onChange({ ...data, subtitle })}
              editing={editing}
              as="p"
              multiline
              className="w-full text-sm sm:text-base md:text-lg lg:text-xl"
            />

            <EditableText
              value={data.cta}
              onChange={(cta) => onChange({ ...data, cta })}
              editing={editing}
              as="span"
              className="mt-2 inline-block rounded-2xl bg-white px-6 py-2 font-semibold text-[#0F766E] transition hover:bg-gray-200"
            />
          </div>

          {hasImage && (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied URL/data URL, next/image can't optimize either
            <img src={data.image} alt="" className="w-full flex-1 rounded-xl object-cover md:max-w-md" />
          )}
        </AnimatedBlock>

        {editing && (
          <div className="flex flex-col items-center gap-4">
            <ImagePicker value={data.image} onChange={(image) => onChange({ ...data, image })} label="Side image" />
            <SectionControls
              styles={styles}
              animation={data.animation}
              onStyleChange={handleStyleChange}
              onAnimationChange={(animation) => onChange({ ...data, animation })}
            />
          </div>
        )}
      </div>
    </section>
  );
}
