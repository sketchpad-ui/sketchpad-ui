# Sketchpad UI — Component Roadmap

Target: full parity with a modern component-library catalog (shadcn/ui-style coverage), adapted to the pen-on-paper wireframe aesthetic.

**Legend**

| Status | Meaning |
|--------|---------|
| ✅ Shipped | In `sketchpad-ui` v0.1, documented or usable |
| 🟡 Partial | Exists under a different name or missing variants/API |
| ⬜ Planned | Not implemented yet |
| 💬 Chat | Messaging-specific — new category for Sketchpad |

**Current coverage:** 28 shipped · 14 partial · 22 planned (+ 5 chat)

---

## Shipped (v0.1)

| Component | Export | Notes |
|-----------|--------|-------|
| Alert Dialog | `AlertDialog` | Confirm/cancel pattern |
| Avatar | `Avatar` | Sketch frame + placeholder |
| Badge | `Badge` | default, stamp, marker variants |
| Breadcrumb | `Breadcrumbs` | Sketch arrow separators |
| Button | `Button`, `IconButton` | primary, filled, accent, ghost, link, icon |
| Checkbox | `Checkbox` | Draw-on tick animation |
| Drawer | `Drawer` | Edge slide-in sheet |
| Empty | `EmptyState` | Illustration slot + handwritten text |
| Input | `TextInput`, `SearchInput` | Sketch border + label/error |
| Pagination | `Pagination` | Sketch-boxed page numbers |
| Popover | `Popover` | Paper-note floating panel |
| Progress | `ProgressBar` | Marker-color fill |
| Radio Group | `RadioGroup` | Imperfect circles |
| Select | `Select` | Custom listbox + keyboard a11y |
| Separator | `Divider` | Rough line, dashed, double-stroke |
| Sheet | `Drawer` | Alias pattern — same component |
| Sidebar | `Sidebar` | Marker-style active highlight |
| Skeleton | `SkeletonLoader` | Deterministic scribble lines |
| Slider | `Slider` | Sketch track + thumb |
| Switch | `Toggle` | Sketched pill + knob |
| Table | `Table` | Horizontal dividers only |
| Tabs | `Tabs` | Folder-tab sketch shapes |
| Textarea | `Textarea` | Matches input styling |
| Toast | `ToastContainer`, `useToast` | Paper-note toasts |
| Tooltip | `Tooltip` | Paper-note + sketch border |
| Dialog | `Modal` | Stacked paper-sheet modal |
| Navigation Menu | `Navbar`, `Stepper` | Partial — no mega-menu yet |
| Card | `Paper`, `StatCard` | Partial — no generic `Card` API yet |

---

## Partial — needs API polish or alias (v0.2)

| Catalog name | Today | Gap |
|--------------|-------|-----|
| Card | `Paper`, `StatCard` | Unified `Card` with header/footer/actions |
| Combobox | `Select` | Typeahead filter + creatable option |
| Data Table | `Table` | Sorting, column resize, row selection |
| Dialog | `Modal` | Rename or export alias; size variants |
| Dropdown Menu | `Select`, `Popover` | Action menu pattern (not form select) |
| Field | `TextInput` + labels | Standalone `Field`, `FieldLabel`, `FieldError` |
| Hover Card | `Tooltip` | Rich content panel on hover, not just string |
| Label | inline on inputs | Export standalone `Label` |
| Navigation Menu | `Navbar` | Nested submenus, viewport positioning |
| Sonner | `useToast` | Stacked toast lib UX (position, swipe dismiss) |
| Spinner | — | Loading indicator using sketch arc/scribble |
| Typography | `HandwrittenNote` | `Heading`, `Text`, `Code`, `Lead`, `Muted` |
| Switch | `Toggle` | Export `Switch` alias |
| Sheet | `Drawer` | Export `Sheet` alias + side variants |

---

## Planned — standard library (v0.3 → v0.5)

Grouped by implementation phase. Estimates assume solo part-time dev.

### Phase A — Layout & structure (1–2 weeks)

| Component | Priority | Notes |
|-----------|----------|-------|
| Accordion | High | Sketch fold lines; one-open vs multi-open |
| Aspect Ratio | Medium | Wrapper for media placeholders |
| Collapsible | High | Chevron/sketch arrow trigger |
| Resizable | Medium | Sketch drag handle between panels |
| Scroll Area | Medium | Custom scrollbar as rough line |
| Item | Low | Generic list row (media + title + actions) |
| Direction | Low | RTL provider + logical property docs |

### Phase B — Forms & input (2–3 weeks)

| Component | Priority | Notes |
|-----------|----------|-------|
| Button Group | High | Segmented sketch pill group |
| Input Group | High | Prefix/suffix slots (icon, text, button) |
| Input OTP | Medium | Individual sketch boxes + paste support |
| Native Select | Low | Styled native fallback for mobile |
| Toggle Group | Medium | Radio-style toggle for segmented control |
| Date Picker | High | Calendar popover + sketch input |
| Calendar | High | Grid of rough circles/boxes for days |
| Kbd | Low | Hand-drawn keyboard shortcut badge |

### Phase C — Overlays & menus (2–3 weeks)

| Component | Priority | Notes |
|-----------|----------|-------|
| Alert | High | Inline banner — not modal — icon + text |
| Context Menu | High | Right-click sketch menu |
| Menubar | Medium | Horizontal menu bar + submenus |
| Dropdown Menu | High | Action lists (separate from Select) |
| Hover Card | Medium | Card preview on hover delay |

### Phase D — Data & display (2–3 weeks)

| Component | Priority | Notes |
|-----------|----------|-------|
| Carousel | Medium | Sketch arrow nav + snap slides |
| Chart | Medium | Line/bar on rough axes — light recharts wrapper or SVG-only |
| Command | High | ⌘K palette — filterable sketch list |
| Table enhancements | High | Sort icons, pagination integration |
| Spinner | High | Animated sketch arc |

---

## Planned — Chat / messaging (v0.6) 💬

These appear as "New" in modern catalogs (chat UI kits). Sketchpad-appropriate versions use bubble borders, tape accents, and handwritten timestamps — **not** glossy chat apps.

| Component | Priority | Notes |
|-----------|----------|-------|
| Bubble | High | Sent/received message container; tail variant |
| Message | High | Avatar + bubble + timestamp + status |
| Message Scroller | High | Virtualized list, scroll-to-bottom, unread marker |
| Attachment | Medium | File chip with sketch clip icon + progress |
| Marker | Medium | Read/delivery indicator or inline annotation dot |

Build after Phase C — reuses `Avatar`, `Bubble`, `Scroll Area`, `Attachment`.

---

## Docs site parity

Each shipped/planned component gets a docs page at `/components/[name]` matching the catalog layout:

```
/components          ← index (all components, two columns + "New" section)
/components/button
/components/accordion
…
```

**Docs index page** — planned for v0.2 (mirrors reference screenshot).

---

## Release milestones

| Version | Goal | Component count (target) |
|---------|------|--------------------------|
| **v0.1** ✅ | Spec baseline + engine | ~35 exports |
| **v0.2** | API polish + aliases + Spinner + Alert + Card | ~45 |
| **v0.3** | Phase A + Command + Date Picker | ~55 |
| **v0.4** | Phase C menus + Carousel | ~65 |
| **v0.5** | Chart + Data Table pro + Input OTP | ~72 |
| **v0.6** | Chat kit (Bubble, Message, …) | ~77 |
| **v1.0** | Full catalog, a11y audit, npm + docs live | 64 catalog + chat |

---

## Non-goals (unchanged)

Every new component must pass the [CONTRIBUTING.md](./CONTRIBUTING.md) checklist — pen-on-paper, not neobrutalism, not Material, not cute doodle kits.

---

## Priority order (if picking one at a time)

1. `Card` (unify Paper/StatCard)
2. `Alert`
3. `Spinner`
4. `Dropdown Menu` + `Context Menu`
5. `Command` (⌘K)
6. `Accordion` + `Collapsible`
7. `Date Picker` + `Calendar`
8. `Button Group` + `Input Group`
9. `Carousel`
10. Chat kit (`Bubble` → `Message` → `Message Scroller`)

---

*Last updated: 2026-07-06 · 28 shipped, 36 remaining to full catalog parity*
