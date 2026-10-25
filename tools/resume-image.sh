#!/bin/sh
# Makes the picture of your resume shown on the Resume page and in the zoomable resume viewer.
# It is rendered large (3600 px tall) so the text stays sharp when zoomed in.
# Run this after replacing public/media/resume/Kasin-Ito-Sato-Resume.pdf:
#   sh tools/resume-image.sh
set -e
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
qlmanage -t -s 3600 -o "$tmp" public/media/resume/Kasin-Ito-Sato-Resume.pdf >/dev/null 2>&1
cp "$tmp"/*.png src/assets/resume-page.png
rm -rf "$tmp"
echo "Updated src/assets/resume-page.png"
