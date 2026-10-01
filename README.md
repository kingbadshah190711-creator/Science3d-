# Science3D – Android app (Capacitor)

Requirements: Node.js 18+, Android Studio.

1. npm install
2. npm run android:add     (sirf pehli baar)
3. npm run sync           (three.js ko www/ mein copy karta hai aur Android project update karta hai)
4. npm run android:open   (Android Studio khulega)
5. Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)

APK milne ke baad phone mein install karo. Play Store ke liye "Build > Generate Signed Bundle (AAB)" use karo.

App ka code: www/index.html (ek hi file). Naye diagrams yahin add karo.
Three.js local copy hota hai, isliye app internet ke bina bhi chalta hai.

## Bina computer setup ke APK (GitHub se)
1. github.com par free account banao, naya repository banao.
2. Is folder ki saari files (".github" folder samet) upload karo.
3. Actions tab > "Build APK" > run hone do (5-8 min).
4. Run ke andar Artifacts se "Science3D-apk" download karo, zip kholo, app-debug.apk phone mein install karo.

## App ke andar
- www/index.html : home (2 buttons)
- www/ai.html : AI diagrams (Anthropic API key chahiye, app mein "API key" se daalo; console.anthropic.com se banti hai)
- www/lab.html : 3D lab (offline chalta hai)
Note: key phone mein save hoti hai. Personal use ke liye theek hai; public app ke liye key apne server par rakho.
