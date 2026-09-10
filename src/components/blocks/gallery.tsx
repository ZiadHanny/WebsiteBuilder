"use client";
import React from "react";
import type { BlockStyles, GalleryData } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import ImagePicker from "@/components/ui/ImagePicker";
import SectionControls from "@/components/ui/SectionControls";
import AnimatedBlock from "@/components/ui/AnimatedBlock";
import { IMAGES } from "@/constants/Image";
import { getSectionBackgroundStyle } from "@/utils/sectionStyle";

interface EditableGalleryProps {
  data: GalleryData;
  onChange: (data: GalleryData) => void;
  editing?: boolean;
}

export default function EditableGallery({ data, onChange, editing }: EditableGalleryProps) {
  const styles = data.styles;

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  const updateImage = (index: number, url: string) => {
    onChange({ ...data, images: data.images.map((img, i) => (i === index ? url : img)) });
  };

  const removeImage = (index: number) => {
    onChange({ ...data, images: data.images.filter((_, i) => i !== index) });
  };

  const addImage = () => {
    onChange({ ...data, images: [...data.images, ""] });
  };

  return (
    <section className="px-4 py-16 transition-colors sm:px-6 lg:px-20" style={getSectionBackgroundStyle(styles)}>
      <AnimatedBlock animation={data.animation} editing={editing} className="text-center" style={{ color: styles.textColor }}>
        <EditableText
          value={data.heading}
          onChange={(heading) => onChange({ ...data, heading })}
          editing={editing}
          as="h2"
          className="mb-10 w-full text-2xl font-bold sm:text-3xl"
        />

        {data.images.length === 0 && !editing ? null : (
          <div className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.images.map((src, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied URL/data URL, next/image can't optimize either
                  <img src={src} alt="" className="aspect-square w-full rounded-xl object-cover" />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-white/40 text-sm text-white/60">
                    No image
                  </div>
                )}
                {editing && (
                  <div className="flex items-center gap-2">
                    <ImagePicker value={src} onChange={(url) => updateImage(i, url)} />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="rounded border border-white/40 p-1.5 text-white hover:bg-red-500/40"
                      aria-label="Remove image slot"
                    >
                      <IMAGES.ICONS.Delete size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {editing && (
          <button
            type="button"
            onClick={addImage}
            className="mt-6 rounded-md bg-white px-3 py-1 text-sm text-[#0F766E] transition hover:bg-gray-100"
          >
            + Add image
          </button>
        )}
      </AnimatedBlock>

      {editing && (
        <div className="mt-8 flex justify-center">
          <SectionControls
            styles={styles}
            animation={data.animation}
            onStyleChange={handleStyleChange}
            onAnimationChange={(animation) => onChange({ ...data, animation })}
          />
        </div>
      )}
    </section>
  );
}
