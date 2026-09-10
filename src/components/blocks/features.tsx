"use client";
import React from "react";
import type { BlockStyles, FeaturesData } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import SectionControls from "@/components/ui/SectionControls";
import AnimatedBlock from "@/components/ui/AnimatedBlock";
import { IMAGES } from "@/constants/Image";
import { getSectionBackgroundStyle } from "@/utils/sectionStyle";

interface EditableFeaturesProps {
  data: FeaturesData;
  onChange: (data: FeaturesData) => void;
  editing?: boolean;
}

export default function EditableFeatures({ data, onChange, editing }: EditableFeaturesProps) {
  const styles = data.styles;

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  const updateItem = (index: number, field: "title" | "text", value: string) => {
    onChange({ ...data, items: data.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)) });
  };

  const removeItem = (index: number) => {
    onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const addItem = () => {
    onChange({ ...data, items: [...data.items, { title: "New feature", text: "Describe it here." }] });
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

        <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <div key={i} className="relative rounded-xl bg-white/10 p-6 text-left backdrop-blur-sm">
              {editing && (
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="absolute top-2 right-2 rounded p-1 text-white/70 hover:text-red-300"
                  aria-label={`Remove "${item.title}" feature`}
                >
                  <IMAGES.ICONS.Delete size={14} />
                </button>
              )}
              <EditableText
                value={item.title}
                onChange={(title) => updateItem(i, "title", title)}
                editing={editing}
                as="h3"
                className="mb-2 text-lg font-semibold"
              />
              <EditableText
                value={item.text}
                onChange={(text) => updateItem(i, "text", text)}
                editing={editing}
                as="p"
                multiline
                className="text-sm opacity-90"
              />
            </div>
          ))}
        </div>

        {editing && (
          <button
            type="button"
            onClick={addItem}
            className="mt-6 rounded-md bg-white px-3 py-1 text-sm text-[#0F766E] transition hover:bg-gray-100"
          >
            + Add feature
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
