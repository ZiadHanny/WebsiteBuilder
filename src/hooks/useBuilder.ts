"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BuilderData, Section, SectionData, SectionName } from "@/types/blocksTypes";
import { SECTION_INFO, createDefaultSectionData, normalizeSections } from "@/constants/sectionDefaults";

const STORAGE_KEY = "website-builder:data";

function loadFromStorage(): unknown {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Owns all state for the page builder — the section layout and every
 * section's own content — plus persistence, so `BuilderPage` can stay
 * focused on rendering. Also used read-only by the standalone /preview
 * route, which just needs `sections` without any of the mutation handlers.
 */
export function useBuilder() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore a previous session on mount (client-only: localStorage isn't
  // available during server rendering).
  useEffect(() => {
    setSections(normalizeSections(loadFromStorage()));
    setIsLoaded(true);
  }, []);

  // Persist on every change, once the initial restore has happened (so we
  // don't immediately overwrite a saved session with an empty page).
  useEffect(() => {
    if (!isLoaded) return;
    const data: BuilderData = { sections };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage may be unavailable (private browsing, quota); edits still
      // work for the session, they just won't survive a reload.
    }
  }, [isLoaded, sections]);

  const addSection = useCallback((name: SectionName) => {
    setSections((prev) => {
      if (SECTION_INFO[name].unique && prev.some((s) => s.name === name)) return prev;
      // createDefaultSectionData(name) always returns the data shape that
      // matches `name`; TS can't see that link through the function call.
      const newSection = { id: crypto.randomUUID(), name, data: createDefaultSectionData(name) } as Section;
      return [...prev, newSection];
    });
  }, []);

  const updateSection = useCallback((id: string, data: SectionData) => {
    // Callers (SectionRenderer's per-type onChange) only ever pass back the
    // data shape that matches that section, TS just can't prove it here.
    setSections((prev) => prev.map((s) => (s.id === id ? ({ ...s, data } as Section) : s)));
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
    const data: BuilderData = { sections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [sections]);

  const importJSON = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setSections(normalizeSections(imported));
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
    addSection,
    updateSection,
    removeSection,
    moveSection,
    hasSection,
    exportJSON,
    importJSON,
    fileInputRef,
  };
}
