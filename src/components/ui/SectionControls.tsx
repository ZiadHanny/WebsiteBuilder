import React from "react";
import type { BlockStyles, TextAnimation } from "@/types/blocksTypes";
import ColorStylePicker from "./ColorStylePicker";
import ImagePicker from "./ImagePicker";

const ANIMATIONS: { value: TextAnimation; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fade-in", label: "Fade in" },
  { value: "fade-up", label: "Fade up" },
  { value: "zoom-in", label: "Zoom in" },
];

interface SectionControlsProps {
  styles: BlockStyles;
  animation: TextAnimation;
  onStyleChange: (key: keyof BlockStyles, value: string) => void;
  onAnimationChange: (animation: TextAnimation) => void;
}

/**
 * Everything an editor can tweak about a section besides its own content:
 * colors, an optional background image with an overlay strength, and the
 * scroll-in animation. Composes ColorStylePicker (which stays focused on
 * just the three color fields) rather than folding all of this into it.
 */
export default function SectionControls({ styles, animation, onStyleChange, onAnimationChange }: SectionControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-black/10 px-4 py-3 text-sm backdrop-blur-sm">
      <ColorStylePicker styles={styles} onChange={onStyleChange} />

      <ImagePicker value={styles.backgroundImage ?? ""} onChange={(url) => onStyleChange("backgroundImage", url)} label="Background" />

      {styles.backgroundImage && (
        <label className="flex flex-col items-center gap-1">
          <span className="text-white/90">Overlay</span>
          <input
            type="range"
            min={0}
            max={90}
            value={Number(styles.backgroundOverlay ?? "40")}
            onChange={(e) => onStyleChange("backgroundOverlay", e.target.value)}
            className="w-24"
            aria-label="Background image overlay darkness"
          />
        </label>
      )}

      <label className="flex flex-col items-center gap-1">
        <span className="text-white/90">Animation</span>
        <select
          value={animation}
          onChange={(e) => onAnimationChange(e.target.value as TextAnimation)}
          className="rounded border border-white/40 bg-transparent px-2 py-1 text-white [&>option]:text-black"
          aria-label="Text entrance animation"
        >
          {ANIMATIONS.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
