import React from "react";
import type { LinkItem } from "@/types/blocksTypes";
import EditableText from "./EditableText";
import { IMAGES } from "@/constants/Image";

interface EditableLinkListProps {
  links: LinkItem[];
  onChange: (links: LinkItem[]) => void;
  editing?: boolean;
  textColor: string;
  className?: string;
}

/**
 * A row of editable link labels with add/remove controls — the exact same
 * pattern the header nav and the footer links both needed, previously
 * duplicated in full in each of those components.
 */
export default function EditableLinkList({
  links,
  onChange,
  editing = false,
  textColor,
  className,
}: EditableLinkListProps) {
  const updateLabel = (index: number, label: string) => {
    onChange(links.map((link, i) => (i === index ? { ...link, label } : link)));
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const addLink = () => {
    onChange([...links, { label: "New Link", href: "#" }]);
  };

  return (
    <div className={className}>
      {links.map((link, i) => (
        <div key={i} className="flex items-center gap-1">
          {editing ? (
            <EditableText
              value={link.label}
              onChange={(label) => updateLabel(i, label)}
              editing
              className="w-[90px] text-center text-sm"
              style={{ color: textColor }}
            />
          ) : (
            <a
              href={link.href}
              className="cursor-pointer px-1 text-sm font-medium transition hover:opacity-80"
              style={{ color: textColor }}
            >
              {link.label}
            </a>
          )}
          {editing && (
            <button
              type="button"
              onClick={() => removeLink(i)}
              className="rounded p-1 text-white/70 hover:text-red-300"
              aria-label={`Remove "${link.label}" link`}
            >
              <IMAGES.ICONS.Delete size={14} />
            </button>
          )}
        </div>
      ))}
      {editing && (
        <button
          type="button"
          onClick={addLink}
          className="rounded-md bg-white px-2 py-[2px] text-sm text-[#0F766E] transition hover:bg-gray-100"
        >
          + Add
        </button>
      )}
    </div>
  );
}
