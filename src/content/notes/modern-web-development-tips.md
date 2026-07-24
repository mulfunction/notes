---
title: "Modern Web Development Principles: Fast, Bespoke, & Clean"
description: "Core tenets of modern frontend development: zero-JS defaults, performance-first CSS, and clean layout patterns."
date: 2026-07-20
category: "Thoughts"
tags: ["frontend", "performance", "design-system", "web-dev"]
draft: false
featured: false
---

# Modern Web Development Principles

Building web apps in 2026 requires balancing high aesthetic appeal with strict performance guardrails.

## Core Rules

1. **Ship Zero JavaScript by Default**: Use SSG (Static Site Generation) and hydrate UI islands only when interactivity is needed.
2. **Deterministic Typography**: Use clean font pairings (`Geist`, `Outfit`, `Inter`) with tight tracking on headings.
3. **Viewport Stability**: Always use `min-h-[100dvh]` instead of fixed height `h-screen` on mobile viewports.
4. **Accessible Color Palettes**: Stick to 1 desaturated accent color on neutral zinc/slate bases.

```typescript
// Utility function for calculating reading time
export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```
