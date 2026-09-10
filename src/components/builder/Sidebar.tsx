"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "@/constants/Image";
import type { SectionName } from "@/types/blocksTypes";

const SECTION_INFO: Record<SectionName, { tag: string; description: string; unique: boolean }> = {
  Header: { tag: "Navigation", description: "Navigation with logo and menu items", unique: true },
  Hero: { tag: "Content", description: "A big introduction banner for any page.", unique: false },
  Footer: { tag: "Content", description: "Links and copyright, at the bottom of the page.", unique: true },
};

const SECTIONS: SectionName[] = ["Header", "Hero", "Footer"];

interface SidebarProps {
  onAddSection: (name: SectionName) => void;
  hasSection: (name: SectionName) => boolean;
}

export default function CollapsibleSidebar({ onAddSection, hasSection }: SidebarProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 rounded-md bg-[#0F766E] p-2 text-white shadow-lg lg:hidden"
          aria-label="Open sections panel"
        >
          <IMAGES.ICONS.ArrowRight />
        </button>
      )}

      <motion.aside
        initial={false}
        animate={{ width: open ? 320 : 76 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={`
          fixed top-0 left-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white shadow-md
          lg:relative lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <AnimatePresence>
            {open && (
              <motion.h1
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="text-base font-semibold text-[#0F766E]"
              >
                Sections
              </motion.h1>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 transition hover:bg-[#0F766E] hover:text-white"
            aria-label={open ? "Collapse sections panel" : "Expand sections panel"}
          >
            {open ? <IMAGES.ICONS.ArrowLeft /> : <IMAGES.ICONS.ArrowRight />}
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {SECTIONS.map((name) => {
            const info = SECTION_INFO[name];
            const disabled = info.unique && hasSection(name);

            return (
              <button
                key={name}
                onClick={() => !disabled && onAddSection(name)}
                disabled={disabled}
                title={disabled ? `Only one ${name} section is allowed` : `Add ${name}`}
                className={`
                  flex w-full items-center gap-3 rounded-lg bg-white text-left shadow-sm transition duration-150 ease-in-out
                  ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-2 hover:border-[#0F766E] hover:shadow-md"}
                  ${open ? "px-4 py-4" : "h-16 justify-center"}
                `}
              >
                <div className={`rounded-md bg-[#0F766E]/10 p-2 text-[#0F766E] ${open ? "self-start" : "m-auto"}`}>
                  <span className="text-xl font-bold">{name.charAt(0)}</span>
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col space-y-1 overflow-hidden"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-gray-900">{name}</span>
                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                          {info.tag}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {disabled ? `Already on the page` : info.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </motion.aside>

      {/* Backdrop for small screens when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden"
        />
      )}
    </>
  );
}
