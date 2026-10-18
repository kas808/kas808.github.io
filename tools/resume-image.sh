#!/bin/sh
# Makes the picture of your resume shown on the Resume page.
# Run this after replacing public/media/resume/Kasin-Ito-Sato-Resume.pdf:
#   sh tools/resume-image.sh
set -e
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
qlmanage -t -s 2400 -o "$tmp" public/media/resume/Kasin-Ito-Sato-Resume.pdf >/dev/null 2>&1
cp "$tmp"/*.png src/assets/resume-page.png
rm -rf "$tmp"
echo "Updated src/assets/resume-page.png"
