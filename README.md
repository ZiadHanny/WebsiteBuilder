# Website Builder

A small, client-side visual page builder built with Next.js. Add a Header,
Hero, and/or Footer section, edit the text and colors directly in place,
reorder or remove sections, and export/import the whole page as JSON.

## Features

- **Click-to-edit content** — logo, nav links, headline, subtitle, button
  text, footer text and links are all editable inline; no separate settings
  panel.
- **Per-section color controls** — background, text, and border color for
  every section.
- **Reorder and remove sections** on hover, from the section's own toolbar.
- **Export / Import as JSON** to save a page and load it back later.
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
    blocks/             # Header, Hero, Footer — the actual page content blocks
    ui/                 # EditableText, EditableLinkList, ColorStylePicker — shared primitives
  hooks/
    useBuilder.ts        # all builder state: sections, block data, persistence, import/export
  types/
    blocksTypes.ts       # Section/BuilderData/block data shapes
```

All page state lives in `useBuilder`; the block components (`Header`, `Hero`,
`Footer`) are pure presentational components that take their data and an
`onChange` callback, so the same components render both the editable
builder view and the read-only preview.

## Notes

This is a client-only MVP: everything (state, autosave, import/export)
happens in the browser, there's no backend or database, and exported pages
are static markup you'd still need to host somewhere yourself.
