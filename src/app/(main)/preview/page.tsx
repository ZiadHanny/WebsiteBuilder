"use client";

import React from "react";
import Link from "next/link";
import { useBuilder } from "@/hooks/useBuilder";
import SectionRenderer from "@/components/builder/SectionRenderer";

/**
 * A clean, chrome-free render of the page currently saved in the builder —
 * useful for opening in its own tab to see exactly what a visitor would see,
 * without the editor sidebar/toolbar around it.
 */
export default function PreviewPage() {
  const { isLoaded, sections, updateSection } = useBuilder();

  if (!isLoaded) return null;

  if (sections.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center text-gray-500">
        <p>Nothing to preview yet — add some sections in the builder first.</p>
        <Link href="/" className="text-[#0F766E] underline">
          Back to the builder
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          editing={false}
          onChange={(data) => updateSection(section.id, data)}
        />
      ))}
    </div>
  );
}
