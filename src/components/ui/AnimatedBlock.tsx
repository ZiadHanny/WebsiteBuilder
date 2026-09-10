"use client";

import React, { useEffect, useRef, useState } from "react";
import type { TextAnimation } from "@/types/blocksTypes";

interface AnimatedBlockProps {
  animation: TextAnimation;
  /** Whether the surrounding block is in builder edit mode — animation is disabled there so fields being typed into don't fade away. */
  editing?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Reveals its children with a CSS transition once scrolled into view. The
 * reveal class is only added client-side after mount (see `ready`), so a
 * page rendered without JS never ends up with permanently invisible content.
 */
export default function AnimatedBlock({ animation, editing, className, style, children }: AnimatedBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const armed = animation !== "none" && !editing;

  useEffect(() => {
    if (!armed) return;
    setReady(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [armed]);

  const revealClass = ready ? `reveal reveal-${animation} ${inView ? "in-view" : ""}` : "";

  return (
    <div ref={ref} className={`${className ?? ""} ${revealClass}`.trim()} style={style}>
      {children}
    </div>
  );
}
