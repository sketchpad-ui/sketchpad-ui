## Contributing

### Non-goals checklist (every PR)

Before merging, confirm the change does **not** drift toward:

- Neobrutalism (thick uniform borders + solid shadow blocks)
- Comic / cute doodle kits
- Material Design, glassmorphism, neumorphism, corporate SaaS, Apple-minimal
- Messy doodle art — must stay legible at real sizes

### Rules

- Never use `Math.random()` — use `createSeededRandom` from `@sketchpad/sketch-core`
- Interactive components must use real semantic HTML (`<button>`, `<input>`, etc.)
- Sketch SVG layers are decorative only (`aria-hidden`)
- Every hand-drawn element accepts a `seed` prop

### Development

```bash
pnpm install
pnpm build
pnpm dev
pnpm test
```
