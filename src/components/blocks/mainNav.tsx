"use client";
import React from "react";
import type { HeaderData, BlockStyles } from "@/types/blocksTypes";
import { DEFAULT_BLOCK_STYLES } from "@/types/blocksTypes";
import EditableText from "@/components/ui/EditableText";
import EditableLinkList from "@/components/ui/EditableLinkList";
import ColorStylePicker from "@/components/ui/ColorStylePicker";

interface EditableHeaderProps {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
  editing?: boolean;
}

export default function EditableHeader({ data, onChange, editing }: EditableHeaderProps) {
  const styles = data.styles ?? DEFAULT_BLOCK_STYLES;

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onChange({ ...data, styles: { ...styles, [key]: value } });
  };

  return (
    <header
      className="flex flex-col gap-4 rounded-t-xl px-4 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
      style={{ backgroundColor: styles.backgroundColor, borderBottom: `4px solid ${styles.borderColor}` }}
    >
      {/* Logo */}
      <div className="flex-shrink-0 text-center sm:text-left" style={{ color: styles.textColor }}>
        <EditableText
          value={data.Logo}
          onChange={(Logo) => onChange({ ...data, Logo })}
          editing={editing}
          as="h1"
          className="text-lg font-bold"
        />
      </div>

      {/* Links */}
      <EditableLinkList
        links={data.links}
        onChange={(links) => onChange({ ...data, links })}
        editing={editing}
        textColor={styles.textColor}
        className="flex flex-1 flex-wrap justify-center gap-2 sm:justify-start sm:gap-4"
      />

      {/* Button */}
      <div className="flex-shrink-0 text-center sm:text-right">
        <EditableText
          value={data.button}
          onChange={(button) => onChange({ ...data, button })}
          editing={editing}
          as="span"
          className="inline-block rounded-xl bg-white px-3 py-1 text-[14px] font-semibold text-[#0F766E] transition hover:bg-gray-200"
        />
      </div>

      {editing && <ColorStylePicker styles={styles} onChange={handleStyleChange} />}
    </header>
  );
}
