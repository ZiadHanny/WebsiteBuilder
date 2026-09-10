# Website Builder

A small, client-side visual page builder built with Next.js. Freely compose a
landing page from six section types — Header, Hero, Features, Content,
Gallery, Footer — editing text, images, and colors directly in place,
reordering or removing sections, and exporting/importing the whole page as
JSON.

## Features

- **Six section types** — Header and Footer (one each), plus repeatable
  Hero, Features, Content, and Gallery sections; add as many of the
  repeatable ones as a page needs, in any order.
- **Click-to-edit content** — headings, text, links, and buttons are all
  editable inline; no separate settings panel.
- **Images everywhere** — paste a URL or upload a file for a Hero/Content
  side image or a Gallery slot, and set a background image (with an
  adjustable dark overlay for text legibility) on any section.
- **Scroll-in text animation** — each section can fade in, fade up, or zoom
  in as it scrolls into view, or stay static. Disabled automatically while
  editing so the fields you're typing into don't disappear, and respects
  `prefers-reduced-motion`.
- **Per-section color controls** — background, text, and border color for
  every section.
- **Reorder and remove sections** on hover, from the section's own toolbar.
- **Export / Import as JSON** to save a page and load it back later (older
  exports, from before sections carried their own images/animation, still
  import cleanly).
- **Autosaves to your browser** (`localStorage`) as you edit, so a reload
  doesn't lose your work.
- **Live preview** — either toggle in-place, or open `/preview` in a new
  tab for a completely chrome-free view of the page.

## Running locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

## Project structure

```
src/
  app/
    (main)/
      page.tsx        # the builder screen
      preview/page.tsx # chrome-free live preview, reads the saved page
    layout.tsx
  components/
    builder/           # BuilderPage, Sidebar, SectionRenderer — builder-only UI
    blocks/             # Header, Hero, Features, Content, Gallery, Footer — the page content blocks
    ui/                 # EditableText, EditableLinkList, ImagePicker, ColorStylePicker, SectionControls, AnimatedBlock
  hooks/
    useBuilder.ts        # all builder state: sections, block data, persistence, import/export
  constants/
    sectionDefaults.ts   # per-section-type defaults, metadata, and legacy-data migration
  types/
    blocksTypes.ts       # Section/BuilderData/block data shapes
  utils/
    sectionStyle.ts       # shared background-color/-image + border inline style
```

Every section carries its own `{ id, name, data }`, so the repeatable types
can appear more than once. `useBuilder` owns the `sections` array and
persistence; the block components (`Header`, `Hero`, `Features`, `Content`,
`Gallery`, `Footer`) are pure presentational components that take their own
`data` and an `onChange` callback, so the same components render both the
editable builder view and the read-only preview.

## Notes

This is a client-only MVP: everything (state, autosave, import/export,
uploaded images) happens in the browser as data URLs, there's no backend or
database, and exported pages are static markup you'd still need to host
somewhere yourself.
