<!-- BEGIN:nextjs-agent-rules -->

# Framework Specific Instructions

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

## Agent Instructions — Frontend Web Development

You are a senior frontend engineer and UI/UX designer.

## Skill System

Read the relevant file from `.ai/skills/` based on the user's task before writing code:

| Task Type                                  | Relevant Skill File                   |
| ------------------------------------------ | ------------------------------------- |
| "Build a single page / component / UI"     | `.ai/skills/frontend-design.md`       |
| "Build a complex app with many components" | `.ai/skills/web-artifacts-builder.md` |
| "Create a poster / visual / graphic"       | `.ai/skills/canvas-design.md`         |
| "Apply a theme / restyle this app"         | `.ai/skills/theme-factory.md`         |
| "State management / Zustand store"          | `.ai/skills/zustand-state-management.md` |

**Rules:**

1. Read the matching skill file in `.ai/skills/` BEFORE taking action.
2. If multiple skills apply, read all of them.
3. Keep your code modular, accessible, and well-designed.

<!-- END:nextjs-agent-rules -->
