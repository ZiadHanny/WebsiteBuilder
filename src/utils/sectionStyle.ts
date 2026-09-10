import type { CSSProperties } from "react";
import type { BlockStyles } from "@/types/blocksTypes";

type BorderSide = "borderTop" | "borderBottom";

/**
 * The background half of a block's inline style: a background image (with a
 * dark overlay for text legibility) when one is set, otherwise the flat
 * background color. Every block needs this, so it lives in one place instead
 * of being reimplemented per block.
 */
export function getSectionBackgroundStyle(styles: BlockStyles, borderSide: BorderSide = "borderTop"): CSSProperties {
  const border = `4px solid ${styles.borderColor}`;

  if (styles.backgroundImage) {
    const overlay = Number(styles.backgroundOverlay ?? "40") / 100;
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay})), url(${styles.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      [borderSide]: border,
    };
  }

  return {
    backgroundColor: styles.backgroundColor,
    [borderSide]: border,
  };
}
