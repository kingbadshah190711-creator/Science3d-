#!/bin/bash
# Builds the flat zip (all files in the root, as the user uploads them to GitHub)
set -e
S=/mnt/user-data/outputs/_work/science3d-app; T=/tmp/flat; rm -rf $T; mkdir -p $T/.github/workflows
cp $S/www/* $T/
cp $S/debug.keystore $S/package.json $S/capacitor.config.json $T/
cp $S/.github/workflows/build-apk.yml $T/.github/workflows/
cp $S/assets/icon-only.png $T/icon-only.png
cp -r $S/android-res $T/android-res
cat > $T/README.md <<'EOT'
# Science 3D
Upload ALL files of this zip (including the .github folder) to the root of your GitHub repository. Actions -> Build APK -> Releases/Artifacts.
Files: index.html (home), lab.html (3D models), ai.html (diagrams + maps), three.min.js (3D engine), icon-only.png (app logo).
EOT
rm -f /mnt/user-data/outputs/science3d-app.zip; (cd $T && zip -rq /mnt/user-data/outputs/science3d-app.zip .)
unzip -l /mnt/user-data/outputs/science3d-app.zip | tail -25
