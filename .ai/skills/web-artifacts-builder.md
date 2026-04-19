---
name: web-artifacts-builder
description: Suite of tools for creating elaborate, multi-component HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.
license: Complete terms in LICENSE.txt
---

# Web Artifacts Builder

To build powerful frontend artifacts, follow these steps:

1. Initialize the frontend repo using proper scaffolding
2. Develop your artifact by editing the generated code
3. Bundle all code into a single HTML file for sharing
4. Display artifact to user
5. (Optional) Test the artifact

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Design & Style Guidelines

VERY IMPORTANT: To avoid what is often referred to as "AI slop", avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font.

## Quick Start

### Step 1: Initialize Project

Create a fully configured project with:

- ✅ React + TypeScript (via Vite)
- ✅ Tailwind CSS latest version with shadcn/ui theming system
- ✅ Path aliases (`@/`) configured
- ✅ 40+ shadcn/ui components pre-installed
- ✅ All Radix UI dependencies included
- ✅ Node 18+ compatibility

### Step 2: Develop Your Artifact

Build the artifact by editing the generated files.

### Step 3: Bundle to Single HTML File

Bundle the React app into a single self-contained HTML artifact with all JavaScript, CSS, and dependencies inlined.

### Step 4: Share Artifact with User

Share the bundled HTML file for viewing.

### Step 5: Testing/Visualizing the Artifact (Optional)

Test/visualize using available tools. Avoid testing upfront as it adds latency. Test later if requested or if issues arise.

## Reference

- **shadcn/ui components**: https://ui.shadcn.com/docs/components
