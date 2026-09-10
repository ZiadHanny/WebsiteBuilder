"use client";

import React, { useRef } from "react";
import { IMAGES } from "@/constants/Image";

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

/**
 * Lets an editor either paste an image URL or upload a file from disk (read
 * as a data URL, since this builder has no backend to upload to). Used for
 * every image field in the builder: hero/content side images, gallery
 * slots, and section background images.
 */
export default function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      {label && <span className="text-white/90">{label}</span>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL…"
          className="w-32 rounded border border-white/40 bg-transparent px-2 py-1 text-xs text-white placeholder:text-white/50 outline-none"
          aria-label={label ? `${label} URL` : "Image URL"}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded border border-white/40 p-1.5 text-white hover:bg-white/10"
          aria-label={label ? `Upload ${label.toLowerCase()}` : "Upload image"}
        >
          <IMAGES.ICONS.Upload size={14} />
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded border border-white/40 p-1.5 text-white hover:bg-red-500/40"
            aria-label={label ? `Remove ${label.toLowerCase()}` : "Remove image"}
          >
            <IMAGES.ICONS.Delete size={14} />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
