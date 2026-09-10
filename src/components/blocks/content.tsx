"use client";
import React from "react";
import type { BlockStyles, ContentData } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import ImagePicker from "@/components/ui/ImagePicker";
import SectionControls from "@/components/ui/SectionControls";
import AnimatedBlock from "@/components/ui/AnimatedBlock";
import { getSectionBackgroundStyle } from "@/utils/sectionStyle";

interface EditableContentProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
  editing?: boolean;
}

export default function EditableContent({ data, onChange, editing }: EditableContentProps) {
  const styles = data.styles;
  const imageFirst = data.imagePosition === "left";

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  return (
    <section className="px-4 py-16 transition-colors sm:px-6 lg:px-20" style={getSectionBackgroundStyle(styles)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <AnimatedBlock
          animation={data.animation}
          editing={editing}
          className={`flex w-full flex-col items-center gap-10 ${imageFirst ? "md:flex-row" : "md:flex-row-reverse"}`}
          style={{ color: styles.textColor }}
        >
          <div className="w-full flex-1">
            {data.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied URL/data URL, next/image can't optimize either
              <img src={data.image} alt="" className="w-full rounded-xl object-cover" />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-white/40 text-sm text-white/60">
                No image yet
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <EditableText
              value={data.heading}
              onChange={(heading) => onChange({ ...data, heading })}
              editing={editing}
              as="h2"
              className="mb-3 w-full text-2xl font-bold sm:text-3xl"
            />
            <EditableText
              value={data.text}
              onChange={(text) => onChange({ ...data, text })}
              editing={editing}
              as="p"
              multiline
              className="w-full text-sm sm:text-base"
            />
          </div>
        </AnimatedBlock>

        {editing && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <ImagePicker value={data.image} onChange={(image) => onChange({ ...data, image })} label="Image" />
              <button
                type="button"
                onClick={() => onChange({ ...data, imagePosition: imageFirst ? "right" : "left" })}
                className="rounded-md border border-white/40 px-2 py-1 text-xs text-white hover:bg-white/10"
              >
                Swap side
              </button>
            </div>
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
