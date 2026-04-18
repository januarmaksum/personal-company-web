# Universal AI Agent Template 🚀

A standardized, multi-editor, and framework-agnostic environment designed to empower AI coding agents (Cursor, Trae, Windsurf, Cline, and more) with project-specific intelligence and up-to-date documentation.

## ✨ Key Features

- **Universal Configuration**: Centralized `AGENT.md` serves as the single source of truth for agent instructions across all supported IDEs.
- **Dynamic Skill Routing**: Intelligent routing that automatically selects the best practices based on your project's `package.json` (supporting Next.js, React, and Vue/Nuxt).
- **Native Next.js Support**: Seamless integration with bundled, version-matched documentation located in `node_modules/next/dist/docs/`, bypassing outdated AI training data.
- **Cross-Editor Compatibility**: Out-of-the-box support for:
  - **Cursor** (`.cursorrules`)
  - **Trae** (`.trae/project_rules.md`)
  - **Windsurf** (`.windsurfrules`)
  - **Cline** (`.clinerules`)
  - **VS Code Copilot** (`.github/copilot-instructions.md`)
  - **Claude CLI** (`CLAUDE.md`)
- **Safety-First Installer**: Advanced installation script with built-in file protection (backup/overwrite/skip logic).

---

## 🚀 Getting Started

### Option A: Use as a Template (Recommended for New Projects)
Click the **"Use this template"** button on GitHub to initialize a new repository with this pre-configured AI environment.

### Option B: Install into an Existing Repository
Run the following one-liner in your terminal at the root of your project:

```bash
curl -sSL https://raw.githubusercontent.com/januarmaksum/template-agent-fe/main/install.sh | bash
```

---

## 🛡️ Installer Safety Features
The installer is designed to be non-destructive. If it detects existing configuration files (e.g., `AGENT.md`), it will prompt you for action:
- **[o] Overwrite**: Replace the existing file with the template version.
- **[b] Backup**: Rename the current file to `.bak` and install the new version.
- **[s] Skip**: Keep your current file untouched.

> 💡 **Tip**: Use the `-y` flag (e.g., `bash install.sh -y`) to automatically overwrite all files without prompts.

---

## 🛠 Directory Structure
- `AGENT.md`: The central "brain" containing identity, tech stack, and skill routing rules.
- `.ai/skills/`: A modular ecosystem of technical expertise (Design, Core Logic, Testing, Frameworks).
- `install.sh`: Automation script for cross-project deployment.

---

## ✍️ Customization
Once installed, simply update the `Tech Stack` section in `AGENT.md`. The AI will automatically adjust its behavior and resource lookup based on your specific framework and dependencies.

Created with ❤️ for a more intelligent development workflow.
