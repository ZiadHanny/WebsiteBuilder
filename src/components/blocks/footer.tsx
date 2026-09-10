"use client";
import React from "react";
import type { BlockStyles, FooterData } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import EditableLinkList from "@/components/ui/EditableLinkList";
import SectionControls from "@/components/ui/SectionControls";
import AnimatedBlock from "@/components/ui/AnimatedBlock";
import { getSectionBackgroundStyle } from "@/utils/sectionStyle";

interface EditableFooterProps {
  data: FooterData;
  onChange: (data: FooterData) => void;
  editing?: boolean;
}

export default function EditableFooter({ data, onChange, editing }: EditableFooterProps) {
  const styles = data.styles;

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  return (
    <footer
      className="w-full rounded-b-xl py-6 shadow-md transition-colors"
      style={{ ...getSectionBackgroundStyle(styles, "borderTop"), color: styles.textColor }}
    >
      <AnimatedBlock
        animation={data.animation}
        editing={editing}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row"
      >
        <EditableText
          value={data.text}
          onChange={(text) => onChange({ ...data, text })}
          editing={editing}
          as="p"
          className="text-center text-sm opacity-90 md:text-left"
        />

        <EditableLinkList
          links={data.links}
          onChange={(links) => onChange({ ...data, links })}
          editing={editing}
          textColor={styles.textColor}
          className="flex flex-wrap justify-center gap-4 md:justify-end"
        />
      </AnimatedBlock>

      {editing && (
        <div className="mt-6 flex justify-center px-4">
          <SectionControls
            styles={styles}
            animation={data.animation}
            onStyleChange={handleStyleChange}
            onAnimationChange={(animation) => onChange({ ...data, animation })}
          />
        </div>
      )}
    </footer>
  );
}
