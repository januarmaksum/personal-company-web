#!/bin/bash

# ==========================================================================================
# AI Agent Skills Installer
# Digunakan untuk memasang standar AGENT.md dan .ai/skills ke repo yang sudah ada.
# ==========================================================================================

set -e

# Opsional: Bisa di-override via env variable
REPO_URL=${1:-"https://github.com/januarmaksum/template-agent-fe.git"}
FORCE_YES=false

# Cek apakah ada flag -y
if [[ "$*" == *"-y"* ]]; then
  FORCE_YES=true
fi

TEMP_DIR=$(mktemp -d)

echo "🚀 Memulai instalasi AI Agent Skills dari: $REPO_URL"

# Helper function untuk copy dengan proteksi
copy_with_protection() {
  local src=$1
  local dest=$2

  if [ -e "$dest" ] && [ "$FORCE_YES" = false ]; then
    echo -n "⚠️  File $dest sudah ada. [o]verwrite, [b]ackup, [s]kip? (o/b/s): "
    read -r choice < /dev/tty
    case "$choice" in
      o|O ) 
        cp -r "$src" "$dest"
        echo "✅ Timpa $dest"
        ;;
      b|B ) 
        mv "$dest" "$dest.bak"
        cp -r "$src" "$dest"
        echo "📦 Backup lama ke $dest.bak & pasang baru"
        ;;
      s|S ) 
        echo "⏭️  Skip $dest"
        ;;
      * ) 
        echo "⏭️  Pilihan tidak valid, skip $dest"
        ;;
    esac
  else
    cp -r "$src" "$dest"
    echo "🆕 Pasang $dest"
  fi
}

# 1. Clone secara minimal ke folder temp
echo "⏳ Mengunduh template..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" > /dev/null 2>&1

# 2. Daftar file dan folder yang akan dikopi
TARGETS=(
  ".ai"
  ".trae"
  "AGENT.md"
  "CLAUDE.md"
  ".cursorrules"
  ".windsurfrules"
  ".clinerules"
)

# 3. Proses setiap item
for item in "${TARGETS[@]}"; do
  if [ -e "$TEMP_DIR/$item" ]; then
    copy_with_protection "$TEMP_DIR/$item" "$item"
  fi
done

# 4. Khusus untuk Copilot
if [ -f "$TEMP_DIR/.github/copilot-instructions.md" ]; then
  mkdir -p .github
  copy_with_protection "$TEMP_DIR/.github/copilot-instructions.md" ".github/copilot-instructions.md"
fi

# 5. Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✨ SELESAI! Repo ini sekarang AI-Ready."
echo "-------------------------------------------------------"
echo "Editor yang didukung: Cursor, Trae, Windsurf, Cline, VS Code, Claude Code."
echo "File Utama: AGENT.md (Silakan sesuaikan tech stack di dalamnya)."
echo "-------------------------------------------------------"
