"use client";
import { IMAGES } from "@/constants/Image";
import { FooterData } from "@/types/blocksTypes";
import React, { useState } from "react";

interface FooterLink {
  label: string;
  href: string;
}



interface EditableFooterProps {
  data: FooterData;
  onChange: (data: FooterData) => void;
  editing?: boolean;
  lang: string
}

export default function EditableFooter({ data, onChange, editing, lang }: EditableFooterProps) {
  const [text, setText] = useState(data.text);
  const [links, setLinks] = useState<FooterLink[]>(data.links);
  const [editingText, setEditingText] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [styles, setStyles] = useState(
    data.styles || {
      backgroundColor: "#0F766E",
      textColor: "#FFFFFF",
      borderColor: "#0F766E",
    }
  );

  const handleStyleChange = (key: keyof typeof styles, value: string) => {
    const updated = { ...styles, [key]: value };
    setStyles(updated);
    onChange({ text, links, styles: updated });
  };

  const handleTextBlur = () => {
    onChange({ text, links, styles });
    setEditingText(false);
  };

  const handleLinkBlur = (index: number) => {
    onChange({ text, links, styles });
    setEditingIndex(null);
  };

  const handleLinkChange = (index: number, newLabel: string) => {
    const updated = [...links];
    updated[index].label = newLabel;
    setLinks(updated);
  };

  const handleAddLink = () => {
    const updated = [...links, { label: "New Link", href: "#" }];
    setLinks(updated);
    onChange({ text, links: updated, styles });
  };

  const handleRemoveLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onChange({ text, links: updated, styles });
  };

  return (
    <footer
      className="w-full py-6 rounded-b-xl shadow-md transition-all"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
        borderTop: `4px solid ${styles.borderColor}`,
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 gap-3">

        {/* Footer Text */}
        <div className="text-center md:text-left">
          {editing && editingText ? (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleTextBlur}
              className="bg-transparent border-b border-white/50 outline-none text-sm text-center md:text-left"
              style={{ color: styles.textColor }}
              autoFocus
            />
          ) : (
            <p
              onClick={() => editing && setEditingText(true)}
              className="text-sm opacity-90 cursor-pointer hover:opacity-100 transition"
            >
              {text}
            </p>
          )}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-1">
              {editing && editingIndex === i ? (
                <input
                  value={link.label}
                  onChange={(e) => handleLinkChange(i, e.target.value)}
                  onBlur={() => handleLinkBlur(i)}
                  className="bg-transparent border-b border-white/30 outline-none text-sm w-[90px] text-center"
                  style={{ color: styles.textColor }}
                  autoFocus
                />
              ) : (
                <a
                  onClick={() => editing && setEditingIndex(i)}
                  href={link.href}
                  className="text-sm hover:underline cursor-pointer"
                  style={{ color: styles.textColor }}
                >
                  {link.label}
                </a>
              )}

              {editing && editingIndex === i && (
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleRemoveLink(i)}
                  className="text-xs text-red-300 hover:text-red-500"
                  title="Remove"
                >
                  <IMAGES.ICONS.Delete />
                </button>
              )}
            </div>
          ))}

          {editing && (
            <button
              onClick={handleAddLink}
              className="text-sm bg-white text-[#0F766E] px-2 py-[2px] rounded-md hover:bg-gray-100 transition"
            >
              + Add
            </button>
          )}
        </div>
      </div>


      {editing && (
        <div className="flex justify-center flex-wrap gap-4 mt-6 px-4 text-sm">
          <div className="flex flex-col items-center">
            <label className="mb-1">Background</label>
            <input
              type="color"
              value={styles.backgroundColor}
              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="mb-1">Text Color</label>
            <input
              type="color"
              value={styles.textColor}
              onChange={(e) => handleStyleChange("textColor", e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="mb-1">Border Color</label>
            <input
              type="color"
              value={styles.borderColor}
              onChange={(e) => handleStyleChange("borderColor", e.target.value)}
            />
          </div>
        </div>
      )}
    </footer>
  );
}
