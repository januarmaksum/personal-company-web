---
name: tech-stack-best-practices
description: Dynamic routing skill that loads framework-specific best practices based on the current repository's tech stack. Triggers when writing, refactoring, or reviewing code.
---

# Tech Stack Best Practices

This skill acts as a dynamic router to ensure you apply the correct best practices for the framework used in the current repository.

## Step 1: Detect the Framework
Before writing, designing, or refactoring code, always check the project's dependency manifest (e.g., `package.json` for frontend/Node projects).

Look for key dependencies to determine the core technology:
- `next` ➔ **Next.js** (includes React)
- `react` (without `next`) ➔ **React (standalone)**
- `vue`, `nuxt` ➔ **Vue.js**
- `svelte` ➔ **Svelte**
- `angular` ➔ **Angular**

## Step 2: Load the Framework-Specific Skill
Once you have identified the framework, load the specific best practices skill for that framework.

### Pre-configured Framework Skills:

- **Next.js** (dependency: `next` in package.json):
  - **PRIMARY**: Read docs from `node_modules/next/dist/docs/` — this is the version-matched, official documentation bundled with Next.js. Your training data may be outdated. These docs are the **source of truth**.
    - Structure: `node_modules/next/dist/docs/01-app/` (App Router), `02-pages/` (Pages Router), `03-architecture/`
    - For routing questions → read `01-app/01-getting-started/`
    - For API reference → read `01-app/03-api-reference/`
    - For guides (caching, auth, SSR, etc.) → read `01-app/02-guides/`
  - **ALSO LOAD**: `.ai/skills/react-best-practices/SKILL.md` — 70 React performance rules (still apply within Next.js)
  - **ALSO LOAD**: `.ai/skills/composition-patterns/SKILL.md` (component abstractions)
  - **ALSO LOAD**: `.ai/skills/react-view-transitions/SKILL.md` (animations)
  - **PRIORITY**: If Next.js bundled docs conflict with any skill file, the bundled docs always win.

- **React (standalone)** (dependencies: `react`, `react-dom` WITHOUT `next`):
  - Read `.ai/skills/react-best-practices/SKILL.md` — 70 rules across 8 categories (waterfalls, bundle, server, client, re-render, rendering, JS, advanced)
  - Also load: `.ai/skills/composition-patterns/SKILL.md` (component abstraction patterns)
  - Also load: `.ai/skills/react-view-transitions/SKILL.md` (view transition animations)

- **Vue.js & Nuxt** (dependencies: `vue`, `nuxt`):
  - Read `.ai/skills/vue-best-practices/SKILL.md` — core Composition API + `<script setup>` + TypeScript patterns
  - Also load based on project dependencies:
    - `pinia` in deps → `.ai/skills/vue-pinia-best-practices/SKILL.md` (state management)
    - `vue-router` in deps → `.ai/skills/vue-router-best-practices/SKILL.md` (routing patterns)
    - Testing task → `.ai/skills/vue-testing-best-practices/SKILL.md` (Vitest + Vue Test Utils)
    - Debugging task → `.ai/skills/vue-debug-guides/SKILL.md` (troubleshooting & devtools)
    - Composable design → `.ai/skills/create-adaptable-composable/SKILL.md` (reusable composable patterns)

- **Other Frameworks** (Svelte, Angular, etc.):
  - Look for `.ai/skills/{framework}-best-practices/SKILL.md`
  - If no skill file exists, apply general industry best practices and inform the user they can add one

## Extensibility

To add best practices for a new framework:
1. Create a folder `.ai/skills/{framework}-best-practices/`
2. Add a `SKILL.md` with the framework's rules and patterns
3. This router will automatically detect it from `package.json`

Some frameworks bundle their own docs (like Next.js at `node_modules/next/dist/docs/`). When available, always prefer bundled docs over static skill files — they are version-matched to the project.

No changes to `AGENT.md` or this file needed — detection is automatic.

