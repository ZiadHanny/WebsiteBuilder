"use client";

import React, { useState, useRef } from "react";
import { IMAGES } from "@/constants/Image";

import { FooterData, HeaderData, HeroData } from "@/types/blocksTypes";
import CollapsibleSidebar from "../blocks/Sidebar";
import EditableHeader from "../blocks/mainNav";
import EditableHero from "../blocks/hero";
import EditableFooter from "../blocks/footer";

type SectionName = "Header" | "Hero" | "Footer";

interface Section {
  id: string;
  name: SectionName;
}

export default function BuilderPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [navData, setNavData] = useState<HeaderData>({
    Logo: "MyLogo",
    links: [
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
    button: "Sign In",
    styles: {
      backgroundColor: "#0F766E",
      textColor: "#FFFFFF",
      borderColor: "#0F766E",
    },
  });

  const [heroData, setHeroData] = useState<HeroData>({
    title: "Welcome to MySite",
    subtitle: "Build beautiful pages easily with the visual builder.",
    styles: {
      backgroundColor: "#0F766E",
      textColor: "#FFFFFF",
      borderColor: "#0F766E",
    },
  });

  const [footerData, setFooterData] = useState<FooterData>({
    text: "© 2025 MySite. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    styles: {
      backgroundColor: "#0F766E",
      textColor: "#FFFFFF",
      borderColor: "#0F766E",
    },
  });

  const handleAddSection = (name: SectionName) => {
    const newSection: Section = { id: crypto.randomUUID(), name };
    // Only allow one instance of each major component (Header, Footer)
    if (
      (name === "Header" && sections.some((s) => s.name === "Header")) ||
      (name === "Footer" && sections.some((s) => s.name === "Footer"))
    ) {
      return;
    }
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleTogglePreview = () => setIsPreview(!isPreview);

  const handleExportJSON = () => {
    const data = { navData, heroData, footerData, sections };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.navData) setNavData(imported.navData);
        if (imported.heroData) setHeroData(imported.heroData);
        if (imported.footerData) setFooterData(imported.footerData);
        if (imported.sections) setSections(imported.sections);
      } catch {
        // Use a custom UI alert instead of native alert
        console.error("Invalid JSON file imported.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-100 font-sans">
      {!isPreview && <CollapsibleSidebar onAddSection={handleAddSection} />}

      <div className="flex-1 overflow-auto p-4 md:p-6">

        {!isPreview && (
          <div className="flex flex-wrap justify-end gap-3 mb-3">
            <button
              onClick={handleTogglePreview}
              className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0c5d56] transition"
            >
              Preview
            </button>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0c5d56] transition"
            >
              Export JSON
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0c5d56] transition"
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportJSON}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col w-full mx-auto ">

          {!isPreview && (
            <>
              {sections.length === 0 && (
                <p className="text-gray-400 text-center mt-20 p-8 border border-dashed border-gray-300 rounded-xl">
                  Add sections from the sidebar to start building your page.
                </p>
              )}
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="relative my-4 p-4 border border-gray-300 rounded-xl bg-white shadow-lg transition-all duration-300 group hover:shadow-xl"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="absolute right-3 top-3 z-10 p-1 bg-white text-white rounded-full text-sm hover:bg-amber-50 transition opacity-0 group-hover:opacity-100"
                    title={`Delete ${section.name}`}
                  >
                    <IMAGES.ICONS.Delete />
                  </button>

                  {section.name === "Header" && (
                    <EditableHeader data={navData} onChange={setNavData} editing={true} />
                  )}
                  {section.name === "Hero" && (
                    <EditableHero data={heroData} onChange={setHeroData} editing={true} />
                  )}
                  {section.name === "Footer" && (
                    <EditableFooter data={footerData} onChange={setFooterData} editing={true} />
                  )}
                </div>
              ))}
            </>
          )}


          {isPreview && (
            <div className="w-full h-full">
              {sections.map((section) => (
                <React.Fragment key={section.id}>
                  {section.name === "Header" && (
                    <EditableHeader data={navData} onChange={setNavData} editing={false} />
                  )}
                  {section.name === "Hero" && (
                    <EditableHero data={heroData} onChange={setHeroData} editing={false} />
                  )}
                  {section.name === "Footer" && (
                    <EditableFooter data={footerData} onChange={setFooterData} editing={false} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {isPreview && (
          <div className="flex justify-center my-8">
            <button
              onClick={handleTogglePreview}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Back to Builder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
