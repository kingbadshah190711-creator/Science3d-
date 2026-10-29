import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const command = process.argv[2];

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function copyWebFiles() {
  const www = path.join(root, "www");
  fs.mkdirSync(www, { recursive: true });

  // Copy the app's root-level web assets into Capacitor's configured webDir.
  const extensions = new Set([".html", ".js", ".css", ".png", ".jpg", ".jpeg", ".svg", ".json"]);
  const files = fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()));

  if (!files.some((file) => file.name.toLowerCase() === "index.html")) {
    fail("index.html was not found in the repository root.");
  }

  for (const file of files) {
    fs.copyFileSync(path.join(root, file.name), path.join(www, file.name));
  }
  console.log(`Copied ${files.length} web files to www/`);
}

switch (command) {
  case "check": {
    for (const file of ["index.html", "app.js"]) {
      if (!fs.existsSync(path.join(root, file))) {
        fail(`Required file not found: ${file}`);
      }
    }
    // Syntax-check app.js if it exists.
    if (fs.existsSync(path.join(root, "app.js"))) {
      const { spawnSync } = await import("node:child_process");
      const result = spawnSync(process.execPath, ["--check", "app.js"], {
        cwd: root,
        stdio: "inherit",
      });
      if (result.status !== 0) process.exit(result.status ?? 1);
    }
    console.log("Required files and JavaScript syntax look OK.");
    break;
  }

  case "web":
    copyWebFiles();
    break;

  case "smoke": {
    const index = path.join(root, "www", "index.html");
    if (!fs.existsSync(index)) fail("www/index.html is missing. Run `node build.mjs web` first.");
    const html = fs.readFileSync(index, "utf8");
    if (!html.includes("<html") || !html.includes("</html>")) {
      fail("www/index.html does not look like a complete HTML page.");
    }
    console.log("Basic web app smoke test passed.");
    break;
  }

  case "native":
    console.log("No optional native features are configured by this build script.");
    break;

  case "assets":
    console.log("No generated icon or splash assets are configured by this build script.");
    break;

  case "patch": {
    const gradle = path.join(root, "android", "app", "build.gradle");
    if (!fs.existsSync(gradle)) {
      console.log("Android project not found; skipping version patch.");
      break;
    }

    const versionName = process.env.VERSION_NAME;
    const versionCode = process.env.VERSION_CODE;
    if (!versionName || !versionCode) {
      fail("Set VERSION_NAME and VERSION_CODE before running the patch command.");
    }

    let text = fs.readFileSync(gradle, "utf8");
    text = text.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
    text = text.replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);
    fs.writeFileSync(gradle, text);
    console.log(`Set Android version to ${versionName} (${versionCode}).`);
    break;
  }

  default:
    fail("Use one of: check, web, smoke, native, assets, patch.");
}
