<!-- BEGIN:nextjs-agent-rules -->

# Framework Specific Instructions

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

## Agent Instructions — Frontend Web Development

You are a senior frontend engineer and UI/UX designer.

## Skill System

Read the relevant file from `.agents/skills/` based on the user's task before writing code:

| Task Type                                  | Relevant Skill File                   |
| ------------------------------------------ | ------------------------------------- |
| "Build a single page / component / UI"     | `.agents/skills/frontend-design/SKILL.md`       |
| "Build a complex app with many components" | `.agents/skills/web-artifacts-builder/SKILL.md` |
| "Create a poster / visual / graphic"       | `.agents/skills/canvas-design/SKILL.md`         |
| "Apply a theme / restyle this app"         | `.agents/skills/theme-factory/SKILL.md`         |
| "State management / Zustand store"          | `.agents/skills/zustand-state-management/SKILL.md` |

**Rules:**

1. Read the matching skill file in `.agents/skills/` BEFORE taking action.
2. If multiple skills apply, read all of them.
3. Keep your code modular, accessible, and well-designed.

<!-- END:nextjs-agent-rules -->
