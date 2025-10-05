"use client";
import { IMAGES } from "@/constants/Image";
import { HeaderData } from "@/types/blocksTypes";
import React, { useState } from "react";

interface NavLink {
    label: string;
    href: string;
}



interface EditableHeaderProps {
    data: HeaderData;
    onChange: (data: HeaderData) => void;
    editing?: boolean;
}

export default function EditableHeader({ data, onChange, editing }: EditableHeaderProps) {
    const [logoText, setLogoText] = useState(data.Logo);
    const [links, setLinks] = useState<NavLink[]>(data.links);
    const [textButton, setTextButton] = useState(data.button);

    const [editingLogo, setEditingLogo] = useState(false);
    const [editingLink, setEditingLink] = useState<number | null>(null);
    const [editingButton, setEditingButton] = useState(false);

    const [styles, setStyles] = useState(
        data.styles || {
            backgroundColor: "#0F766E",
            textColor: "#FFFFFF",
            borderColor: "#0F766E",
        }
    );

    const updateData = (updated: Partial<HeaderData>) => {
        const newData = { Logo: logoText, links, button: textButton, styles, ...updated };
        onChange(newData);
    };

    const handleLogoBlur = () => {
        updateData({ Logo: logoText });
        setEditingLogo(false);
    };

    const handleLinkChange = (index: number, newLabel: string) => {
        const updatedLinks = [...links];
        updatedLinks[index].label = newLabel;
        setLinks(updatedLinks);
    };

    const handleLinkBlur = () => {
        updateData({ links });
        setEditingLink(null);
    };

    const handleAddLink = () => {
        const updated = [...links, { label: "New Link", href: "#" }];
        setLinks(updated);
        updateData({ links: updated });
    };

    const handleRemoveLink = (index: number) => {
        const updated = links.filter((_, i) => i !== index);
        setLinks(updated);
        updateData({ links: updated });
    };

    const handleButtonBlur = () => {
        updateData({ button: textButton });
        setEditingButton(false);
    };

    const handleStyleChange = (key: keyof typeof styles, value: string) => {
        const updated = { ...styles, [key]: value };
        setStyles(updated);
        updateData({ styles: updated });
    };

    return (
        <header
            className="flex justify-between w-full relative items-center px-6 py-4 rounded-t-xl shadow-md transition-all"
            style={{ backgroundColor: styles.backgroundColor, borderBottom: `4px solid ${styles.borderColor}` }}
        >

            {/* Logo */}
            <div style={{ color: styles.textColor }}>
                {editing && editingLogo ? (
                    <input
                        value={logoText}
                        onChange={(e) => setLogoText(e.target.value)}
                        onBlur={handleLogoBlur}
                        autoFocus
                        className="text-lg font-semibold bg-transparent border-b border-white/50 outline-none"
                        style={{ color: styles.textColor }}
                    />
                ) : (
                    <h1
                        onClick={() => editing && setEditingLogo(true)}
                        className="text-lg font-semibold cursor-pointer hover:text-gray-200 transition"
                    >
                        {logoText}
                    </h1>
                )}
            </div>

            {/* Links */}
            <nav className="flex items-center gap-4 flex-wrap justify-center" style={{ color: styles.textColor }}>
                {links.map((link, i) => (
                    <div key={i} className="flex items-center gap-1">
                        {editing && editingLink === i ? (
                            <input
                                value={link.label}
                                onChange={(e) => handleLinkChange(i, e.target.value)}
                                onBlur={handleLinkBlur}
                                autoFocus
                                className="bg-transparent border-b border-white/40 outline-none text-sm text-center w-[90px]"
                                style={{ color: styles.textColor }}
                            />
                        ) : (
                            <a
                                onClick={() => editing && setEditingLink(i)}
                                href={link.href}
                                className="text-sm font-medium cursor-pointer hover:text-[#CFFFE5] transition"
                            >
                                {link.label}
                            </a>
                        )}

                        {editing && editingLink === i && (
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleRemoveLink(i)}
                                className="text-xs text-red-300 top-0 -right-2 hover:text-red-500"
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


            </nav>

            {/* Button */}
            <div>
                {editing && editingButton ? (
                    <input
                        type="text"
                        value={textButton}
                        onChange={(e) => setTextButton(e.target.value)}
                        onBlur={handleButtonBlur}
                        autoFocus
                        className="px-4 py-1 rounded-xl text-center bg-white text-[#0F766E] border-b border-gray-300 outline-none font-semibold text-[14px] hover:bg-gray-200 transition"
                    />
                ) : (
                    <button
                        onClick={() => editing && setEditingButton(true)}
                        className="px-4 py-1 rounded-xl bg-white text-[#0F766E] hover:bg-gray-200 font-semibold text-[14px] transition cursor-pointer"
                    >
                        {textButton}
                    </button>
                )}



            </div>

            {editing && (
                <div className="flex justify-start    gap-4 mt-4     bottom-0  px-6">
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Background</label>
                        <input
                            type="color"
                            value={styles.backgroundColor}
                            onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                        />

                    </div>
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Text</label>
                        <input
                            type="color"
                            value={styles.textColor}
                            onChange={(e) => handleStyleChange("textColor", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Border</label>
                        <input
                            type="color"
                            value={styles.borderColor}
                            onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
