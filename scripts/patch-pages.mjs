import { readFile, writeFile } from "node:fs/promises";

const indexPath = new URL("../docs/index.html", import.meta.url);
let html = await readFile(indexPath, "utf8");

html = html.replaceAll('import("/assets/', 'import("./assets/');

if (!html.includes('href="fixes.css"')) {
  html = html.replace("</head>", '<link rel="stylesheet" href="fixes.css"/></head>');
}

if (!html.includes('src="profile-access.js"')) {
  html = html.replace("</body>", '<script defer src="profile-access.js"></script></body>');
}

await writeFile(indexPath, html);
console.log("Patched docs/index.html for GitHub Pages.");
