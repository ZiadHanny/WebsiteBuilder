"use client";
import { HeroData } from "@/types/blocksTypes";
import React, { useState } from "react";



interface EditableHeroProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
    editing?: boolean;
}

export default function EditableHero({ data, onChange, editing }: EditableHeroProps) {
    const [local, setLocal] = useState<HeroData>(data);
    const [editingField, setEditingField] = useState<keyof HeroData | null>(null);

    const [styles, setStyles] = useState(
        data.styles || {
            backgroundColor: "#0F766E",
            textColor: "#FFFFFF",
            borderColor: "#0F766E",
        }
    );

    const handleChange = (field: keyof HeroData, value: string) => {
        const updated = { ...local, [field]: value };
        setLocal(updated);
        onChange({ ...updated, styles });
    };

    const handleBlur = () => setEditingField(null);

    const handleStyleChange = (key: keyof typeof styles, value: string) => {
        const updated = { ...styles, [key]: value };
        setStyles(updated);
        onChange({ ...local, styles: updated });
    };

    return (
        <section
            className="flex justify-center items-center text-center h-full min-w-full w-full shadow-inner py-16 px-4 sm:px-6 lg:px-20 transition-all"
            style={{
                backgroundColor: styles.backgroundColor,
                borderTop: `4px solid ${styles.borderColor}`,
            }}
        >
            <div className="flex flex-col items-center gap-4 max-w-4xl w-full" style={{ color: styles.textColor }}>

                {/* Title */}
                {editing && editingField === "title" ? (
                    <input
                        value={local.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        onBlur={handleBlur}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-transparent border-b border-white/50 outline-none text-center w-full"
                        style={{ color: styles.textColor }}
                        autoFocus
                    />
                ) : (
                    <h1
                        onClick={() => editing && setEditingField("title")}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition w-full cursor-pointer"
                    >
                        {local.title}
                    </h1>
                )}

                {/* Subtitle */}
                {editing && editingField === "subtitle" ? (
                    <textarea
                        value={local.subtitle}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        onBlur={handleBlur}
                        className="text-sm sm:text-base md:text-lg lg:text-xl bg-transparent border-b border-white/40 outline-none text-center w-full resize-none"
                        style={{ color: styles.textColor }}
                        rows={3}
                        autoFocus
                    />
                ) : (
                    <p
                        onClick={() => editing && setEditingField("subtitle")}
                        className="text-sm sm:text-base md:text-lg lg:text-xl transition w-full cursor-pointer"
                    >
                        {local.subtitle}
                    </p>
                )}

                <button className="px-6 py-2 rounded-2xl bg-white text-[#0F766E] hover:bg-gray-200 transition mt-4">
                    Get Start
                </button>

                {/* Color Controls (عند التعديل فقط) */}
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
            </div>
        </section>
    );
}
