#!/usr/bin/env bash
# Build hugo/static/resume.pdf from the /resume/ page (source: hugo/content/resume.md).
# Needs: hugo, Google Chrome (or set CHROME=/path/to/chrome).
# Fails if the PDF is not exactly one page.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/hugo/static/resume.pdf"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

CHROME="${CHROME:-}"
if [[ -z "$CHROME" ]]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" google-chrome chromium chromium-browser; do
    if command -v "$c" >/dev/null 2>&1 || [[ -x "$c" ]]; then CHROME="$c"; break; fi
  done
fi
[[ -n "$CHROME" ]] || { echo "Chrome not found. Set CHROME=/path/to/chrome." >&2; exit 1; }

# Development environment: no analytics in the page that becomes the PDF.
hugo --source "$ROOT/hugo" --environment development --destination "$TMP/site" --quiet

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$TMP/site/resume/index.html" 2>/dev/null

if command -v pdfinfo >/dev/null 2>&1; then
  pages="$(pdfinfo "$OUT" | awk '/^Pages:/ {print $2}')"
  if [[ "$pages" != "1" ]]; then
    echo "resume.pdf has $pages pages. Shorten content/resume.md to fit one page." >&2
    exit 1
  fi
fi
echo "Wrote $OUT"
