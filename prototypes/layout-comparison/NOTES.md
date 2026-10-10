# Layout comparison (disposable)

Eight sample notes at a 1280px viewport: `layout-single.html` vs `layout-grid.html`
(screenshots: `screenshot-single-1280.png`, `screenshot-grid-1280.png`).

**Choice: two-column card grid, newest note first.**

- A single column at 1280px stretches notes to ~1200px: short notes leave huge empty bars and long ones run ~110 characters per line. If a single column is wanted, cap it at ~700px and centre it.
- The grid gives ~590px cards (~65 characters per line), with short and long notes side by side.
- Eight notes take ~420px in the grid and ~430px in the list, so neither scrolls.
- The grid reads row by row, so newest-first zigzags; fine at eight notes, may matter at scale.
- Equal-height cards leave some blank space under short notes; acceptable for basic styling.

This is a prototype only; the product layout is built elsewhere.
