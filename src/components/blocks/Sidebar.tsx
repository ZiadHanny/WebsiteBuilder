"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "@/constants/Image";

type SectionName = "Header" | "Hero" | "Footer";

const sections: SectionName[] = ["Header", "Hero", "Footer"];

export default function CollapsibleSidebar({
  onAddSection,
}: {
  onAddSection: (name: SectionName) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-[#0F766E] text-white p-2 rounded-md shadow-lg lg:hidden"
        >
          ☰
        </button>
      )}

      <motion.aside
        initial={false}
        animate={{
          width: open ? 350 : 80,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className={`
          fixed top-0 left-0 h-screen z-40 bg-white border-r border-gray-200 shadow-md flex flex-col 
          lg:relative lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
            className="p-2 rounded-md hover:bg-[#0F766E] hover:text-white transition"
          >
            {open ? <IMAGES.ICONS.ArrowLeft /> : <IMAGES.ICONS.ArrowRight />}
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {sections.map((name) => (
            <button
              key={name}
              onClick={() => onAddSection(name)}
              className={`
                w-full text-left p-2 rounded-lg bg-white shadow-sm transition duration-150 ease-in-out cursor-pointer 
                hover:border-2 hover:border-[#0F766E] hover:shadow-md 
                flex items-center space-x-3
                ${open ? "py-4 px-4" : "justify-center h-16"}
              `}
            >
              <div
                className={`
                  p-2 rounded-md bg-green-500/10 text-[#0F766E] 
                  ${open ? "self-start" : "m-auto"}
                `}
              >
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
                    <div className="flex items-baseline space-x-2">
                      {/* Title */}
                      <span className="text-lg font-semibold text-gray-900">
                        {name}
                      </span>

                      {/* Tag/Pill */}
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-600">
                        {name.includes("Header") ? "Navigation" : "Content"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500">
                      {name.includes("Header")
                        ? "Navigation with logo and menu items"
                        : "A versatile component for any page."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </motion.aside>

      {/* Backdrop for small screens when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
        ></div>
      )}
    </>
  );
}


