import React from "react";
import type { BlockStyles } from "@/types/blocksTypes";

interface ColorStylePickerProps {
  styles: BlockStyles;
  onChange: (key: keyof BlockStyles, value: string) => void;
}

const FIELDS: { key: keyof BlockStyles; label: string }[] = [
  { key: "backgroundColor", label: "Background" },
  { key: "textColor", label: "Text" },
  { key: "borderColor", label: "Border" },
];

/**
 * The background/text/border color inputs every editable block shows while
 * in edit mode. Extracted once so Header/Hero/Footer don't each carry their
 * own copy of the same three <input type="color"> fields.
 */
export default function ColorStylePicker({ styles, onChange }: ColorStylePickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 rounded-lg bg-black/10 px-4 py-3 text-sm backdrop-blur-sm">
      {FIELDS.map(({ key, label }) => (
        <label key={key} className="flex flex-col items-center gap-1">
          <span className="text-white/90">{label}</span>
          <input
            type="color"
            value={styles[key]}
            onChange={(e) => onChange(key, e.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-white/40 bg-transparent"
            aria-label={`${label} color`}
          />
        </label>
      ))}
    </div>
  );
}
