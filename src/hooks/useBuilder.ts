"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BuilderData, FooterData, HeaderData, HeroData, Section, SectionName } from "@/types/blocksTypes";

const STORAGE_KEY = "website-builder:data";

const DEFAULT_NAV_DATA: HeaderData = {
  Logo: "MyLogo",
  links: [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  button: "Sign In",
};

const DEFAULT_HERO_DATA: HeroData = {
  title: "Welcome to MySite",
  subtitle: "Build beautiful pages easily with the visual builder.",
  cta: "Get Started",
};

const DEFAULT_FOOTER_DATA: FooterData = {
  text: "© 2025 MySite. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

function loadFromStorage(): BuilderData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BuilderData) : null;
  } catch {
    return null;
  }
}

/**
 * Owns all state for the page builder — the section layout, each block's
 * content, and persistence — so `BuilderPage` can stay focused on rendering.
 * Also used read-only by the standalone /preview route, which just needs
 * `data` without any of the mutation handlers.
 */
export function useBuilder() {
  const [sections, setSections] = useState<Section[]>([]);
  const [navData, setNavData] = useState<HeaderData>(DEFAULT_NAV_DATA);
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO_DATA);
  const [footerData, setFooterData] = useState<FooterData>(DEFAULT_FOOTER_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore a previous session on mount (client-only: localStorage isn't
  // available during server rendering).
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setSections(saved.sections ?? []);
      setNavData(saved.navData ?? DEFAULT_NAV_DATA);
      setHeroData(saved.heroData ?? DEFAULT_HERO_DATA);
      setFooterData(saved.footerData ?? DEFAULT_FOOTER_DATA);
    }
    setIsLoaded(true);
  }, []);

  // Persist on every change, once the initial restore has happened (so we
  // don't immediately overwrite a saved session with the empty defaults).
  useEffect(() => {
    if (!isLoaded) return;
    const data: BuilderData = { sections, navData, heroData, footerData };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage may be unavailable (private browsing, quota); edits still
      // work for the session, they just won't survive a reload.
    }
  }, [isLoaded, sections, navData, heroData, footerData]);

  const addSection = useCallback((name: SectionName) => {
    setSections((prev) => {
      const alreadyHasOne = (name === "Header" || name === "Footer") && prev.some((s) => s.name === name);
      if (alreadyHasOne) return prev;
      return [...prev, { id: crypto.randomUUID(), name }];
    });
  }, []);

  const removeSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const moveSection = useCallback((id: string, direction: "up" | "down") => {
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      const target = direction === "up" ? index - 1 : index + 1;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const hasSection = useCallback((name: SectionName) => sections.some((s) => s.name === name), [sections]);

  const exportJSON = useCallback(() => {
    const data: BuilderData = { sections, navData, heroData, footerData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [sections, navData, heroData, footerData]);

  const importJSON = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string) as Partial<BuilderData>;
          if (imported.navData) setNavData(imported.navData);
          if (imported.heroData) setHeroData(imported.heroData);
          if (imported.footerData) setFooterData(imported.footerData);
          if (imported.sections) setSections(imported.sections);
          resolve(true);
        } catch {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }, []);

  return {
    isLoaded,
    sections,
    navData,
    heroData,
    footerData,
    setNavData,
    setHeroData,
    setFooterData,
    addSection,
    removeSection,
    moveSection,
    hasSection,
    exportJSON,
    importJSON,
    fileInputRef,
  };
}
