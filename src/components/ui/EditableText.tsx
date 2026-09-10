"use client";

import React, { useState } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  /** Whether the surrounding block is in builder edit mode at all. */
  editing?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A click-to-edit text field: shows plain text until clicked, then swaps to
 * an input/textarea, saving on blur. Every editable block (header logo and
 * nav links, hero title/subtitle, footer text and links) used to reimplement
 * this exact pattern with its own local "which field is being edited" state;
 * this is that pattern written once.
 */
export default function EditableText({
  value,
  onChange,
  editing = false,
  as: Tag = "span",
  multiline = false,
  className,
  style,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (editing && isEditing) {
    const commonProps = {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.value),
      onBlur: () => setIsEditing(false),
      autoFocus: true,
      className: `bg-transparent border-b border-white/50 outline-none ${className ?? ""}`,
      style,
    };

    return multiline ? (
      <textarea {...commonProps} rows={3} className={`${commonProps.className} resize-none`} />
    ) : (
      <input {...commonProps} type="text" />
    );
  }

  return (
    <Tag
      onClick={() => editing && setIsEditing(true)}
      className={`${editing ? "cursor-pointer" : ""} ${className ?? ""}`}
      style={style}
    >
      {value}
    </Tag>
  );
}
