"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { IMAGES } from "@/constants/Image";
import { useBuilder } from "@/hooks/useBuilder";
import CollapsibleSidebar from "./Sidebar";
import SectionRenderer from "./SectionRenderer";
import type { SectionName } from "@/types/blocksTypes";

const SECTION_LABELS: Record<SectionName, string> = {
  Header: "Header",
  Hero: "Hero",
  Footer: "Footer",
};

export default function BuilderPage() {
  const builder = useBuilder();
  const [isPreview, setIsPreview] = useState(false);
  const [importError, setImportError] = useState(false);

  const handleImportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-importing the same file name later
    if (!file) return;
    const ok = await builder.importJSON(file);
    setImportError(!ok);
  };

  if (!builder.isLoaded) {
    // Avoids a flash of the empty state before a saved session is restored
    // from localStorage.
    return <div className="flex h-screen w-full items-center justify-center bg-gray-100" />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 font-sans lg:flex-row">
      {!isPreview && <CollapsibleSidebar onAddSection={builder.addSection} hasSection={builder.hasSection} />}

      <div className="flex-1 overflow-auto p-4 md:p-6">
        {!isPreview && (
          <Toolbar
            onPreview={() => setIsPreview(true)}
            onExport={builder.exportJSON}
            onImportClick={() => builder.fileInputRef.current?.click()}
          />
        )}
        <input
          ref={builder.fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportChange}
        />
        {importError && (
          <p role="alert" className="mb-3 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            That file couldn&apos;t be imported — make sure it&apos;s a JSON file exported from this builder.
          </p>
        )}

        <div className="mx-auto flex w-full flex-col">
          {!isPreview && (
            <BuilderView
              sections={builder.sections}
              navData={builder.navData}
              heroData={builder.heroData}
              footerData={builder.footerData}
              onNavChange={builder.setNavData}
              onHeroChange={builder.setHeroData}
              onFooterChange={builder.setFooterData}
              onRemove={builder.removeSection}
              onMove={builder.moveSection}
            />
          )}

          {isPreview && (
            <div className="w-full">
              {builder.sections.map((section) => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  editing={false}
                  navData={builder.navData}
                  heroData={builder.heroData}
                  footerData={builder.footerData}
                  onNavChange={builder.setNavData}
                  onHeroChange={builder.setHeroData}
                  onFooterChange={builder.setFooterData}
                />
              ))}
            </div>
          )}
        </div>

        {isPreview && (
          <div className="my-8 flex justify-center">
            <button
              onClick={() => setIsPreview(false)}
              className="rounded-lg bg-gray-700 px-6 py-2 text-white transition hover:bg-gray-800"
            >
              Back to Builder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Toolbar({
  onPreview,
  onExport,
  onImportClick,
}: {
  onPreview: () => void;
  onExport: () => void;
  onImportClick: () => void;
}) {
  const buttonClass =
    "flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2 text-white shadow-sm transition hover:bg-[#0c5d56]";
  const ghostClass =
    "flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition hover:border-[#0F766E] hover:text-[#0F766E]";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold text-gray-800">Your Page</h2>
      <div className="flex flex-wrap justify-end gap-3">
        <Link href="/preview" target="_blank" className={ghostClass}>
          <IMAGES.ICONS.Eye /> Open Preview
        </Link>
        <button onClick={onPreview} className={ghostClass}>
          Preview
        </button>
        <button onClick={onExport} className={buttonClass}>
          <IMAGES.ICONS.Download /> Export JSON
        </button>
        <button onClick={onImportClick} className={buttonClass}>
          <IMAGES.ICONS.Upload /> Import JSON
        </button>
      </div>
    </div>
  );
}

function BuilderView({
  sections,
  navData,
  heroData,
  footerData,
  onNavChange,
  onHeroChange,
  onFooterChange,
  onRemove,
  onMove,
}: {
  sections: ReturnType<typeof useBuilder>["sections"];
  navData: ReturnType<typeof useBuilder>["navData"];
  heroData: ReturnType<typeof useBuilder>["heroData"];
  footerData: ReturnType<typeof useBuilder>["footerData"];
  onNavChange: ReturnType<typeof useBuilder>["setNavData"];
  onHeroChange: ReturnType<typeof useBuilder>["setHeroData"];
  onFooterChange: ReturnType<typeof useBuilder>["setFooterData"];
  onRemove: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}) {
  if (sections.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400">
        <IMAGES.ICONS.Plus size={28} />
        <p>Add sections from the panel to start building your page.</p>
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          className="group relative my-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-3 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-medium text-gray-500">{SECTION_LABELS[section.name]}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onMove(section.id, "up")}
                disabled={index === 0}
                className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Move ${section.name} up`}
              >
                <IMAGES.ICONS.ChevronUp size={16} />
              </button>
              <button
                onClick={() => onMove(section.id, "down")}
                disabled={index === sections.length - 1}
                className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Move ${section.name} down`}
              >
                <IMAGES.ICONS.ChevronDown size={16} />
              </button>
              <button
                onClick={() => onRemove(section.id)}
                className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${section.name}`}
              >
                <IMAGES.ICONS.Delete size={16} />
              </button>
            </div>
          </div>

          <SectionRenderer
            section={section}
            editing
            navData={navData}
            heroData={heroData}
            footerData={footerData}
            onNavChange={onNavChange}
            onHeroChange={onHeroChange}
            onFooterChange={onFooterChange}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
