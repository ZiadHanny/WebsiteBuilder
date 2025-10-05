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

    const handleLogoBlur = () => { updateData({ Logo: logoText }); setEditingLogo(false); };
    const handleLinkChange = (index: number, newLabel: string) => {
        const updatedLinks = [...links]; updatedLinks[index].label = newLabel; setLinks(updatedLinks);
    };
    const handleLinkBlur = () => { updateData({ links }); setEditingLink(null); };
    const handleAddLink = () => { const updated = [...links, { label: "New Link", href: "#" }]; setLinks(updated); updateData({ links: updated }); };
    const handleRemoveLink = (index: number) => { const updated = links.filter((_, i) => i !== index); setLinks(updated); updateData({ links: updated }); };
    const handleButtonBlur = () => { updateData({ button: textButton }); setEditingButton(false); };
    const handleStyleChange = (key: keyof typeof styles, value: string) => { const updated = { ...styles, [key]: value }; setStyles(updated); updateData({ styles: updated }); };

    return (
        <header
            className="flex flex-col sm:flex-row sm:items-center justify-between w-full px-4 py-4 rounded-t-xl transition-all"
            style={{ backgroundColor: styles.backgroundColor, borderBottom: `4px solid ${styles.borderColor}` }}
        >
            {/* Logo */}
            <div className="flex-shrink-0 mb-3 sm:mb-0 text-center sm:text-left" style={{ color: styles.textColor }}>
                {editing && editingLogo ? (
                    <input
                        value={logoText}
                        onChange={(e) => setLogoText(e.target.value)}
                        onBlur={handleLogoBlur}
                        autoFocus
                        className="text-lg font-bold bg-transparent border-b border-white/50 outline-none w-auto"
                        style={{ color: styles.textColor }}
                    />
                ) : (
                    <h1
                        onClick={() => editing && setEditingLogo(true)}
                        className="text-lg font-bold cursor-pointer hover:text-gray-200 transition"
                    >
                        {logoText}
                    </h1>
                )}
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 flex-1 mb-3 sm:mb-0">
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
                                className="text-sm font-medium cursor-pointer hover:text-[#CFFFE5] transition px-1"
                                style={{ color: styles.textColor }}
                            >
                                {link.label}
                            </a>
                        )}
                        {editing && editingLink === i && (
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleRemoveLink(i)}
                                className="text-xs text-red-300 hover:text-red-500 p-1"
                                title="Remove"
                            />
                        )}
                    </div>
                ))}
                {editing && (
                    <button className="text-sm bg-white text-[#0F766E] px-2 py-[2px] rounded-md hover:bg-gray-100 transition" onClick={handleAddLink}>
                        + Add
                    </button>
                )}
            </nav>

            {/* Button */}
            <div className="flex-shrink-0 text-center sm:text-right">
                {editing && editingButton ? (
                    <input
                        type="text"
                        value={textButton}
                        onChange={(e) => setTextButton(e.target.value)}
                        onBlur={handleButtonBlur}
                        autoFocus
                        className="px-3 py-1 rounded-xl text-center bg-white text-[#0F766E] border-b border-gray-300 outline-none font-semibold text-[14px] w-[100px] hover:bg-gray-200 transition"
                    />
                ) : (
                    <button
                        onClick={() => editing && setEditingButton(true)}
                        className="px-3 py-1 rounded-xl bg-white text-[#0F766E] hover:bg-gray-200 font-semibold text-[14px] transition cursor-pointer"
                    >
                        {textButton}
                    </button>
                )}
            </div>

            {/* Style Picker */}
            {editing && (
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-3 sm:mt-4 p-2 rounded-lg">
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Background</label>
                        <input type="color" value={styles.backgroundColor} onChange={(e) => handleStyleChange("backgroundColor", e.target.value)} />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Text</label>
                        <input type="color" value={styles.textColor} onChange={(e) => handleStyleChange("textColor", e.target.value)} />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white">Border</label>
                        <input type="color" value={styles.borderColor} onChange={(e) => handleStyleChange("borderColor", e.target.value)} />
                    </div>
                </div>
            )}
        </header>
    );
}
