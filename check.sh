#!/bin/bash
# Run on the Mac. Makes one small still for each scene of a video, and a log.
# Usage: bash check.sh blue-eyed-islanders
cd "$(dirname "$0")" || exit 1
command -v uv >/dev/null || { echo "uv is missing. Install it: brew install uv"; exit 1; }
mkdir -p cache
{
  uv sync && uv run vid.py setup
  for s in "videos/${1:?give a video name}"/scenes/*.py; do
    echo "== $s"
    uv run vid.py still "$s" || echo "STILL FAILED: $s"
  done
  echo "== timing: full render of scene 1"
  uv run vid.py scene "videos/$1/scenes/01-title.py" || echo "SCENE FAILED"
  echo "== done"
} 2>&1 | tee cache/check.log
