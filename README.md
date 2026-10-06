# Science3D – Android app (Capacitor)
GitHub par APK banane ke steps:
1. Naya repository banao.
2. Is zip ko extract karo aur uske ANDAR ki saari files (www, package.json, capacitor.config.json, .github ...) repository ki ROOT mein upload karo.
3. Actions tab mein "Build APK" 5-8 minute mein poora hota hai.
4. APK: front page par Releases (ya run ke Artifacts) se download karo.
Files: www/index.html (home), www/ai.html (diagrams), www/lab.html (3D library).

## Install error: "package conflicts with an existing package"
Ye tab aata hai jab purana Science3D alag signature se install ho. Is version ka package naam naya hai (com.science3d.learn) aur debug.keystore repo mein hai, isliye:
- Naya app purane ke saath install ho jayega (purana app baad mein uninstall kar do).
- Aage ke saare updates isi key se bante hain, isliye naya APK purane ke upar seedha install hoga.
Zaroori: debug.keystore file ko repository ki root mein upload karna mat bhoolna.
