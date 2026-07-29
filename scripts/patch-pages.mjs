import { readFile, writeFile } from "node:fs/promises";

// Keep the generated static page compatible with repository-based GitHub Pages.
const indexPath = new URL("../docs/index.html", import.meta.url);
let html = await readFile(indexPath, "utf8");

html = html.replaceAll('import("/assets/', 'import("./assets/');

// Always use cache-busted profile fixes so GitHub Pages and browsers do not
// continue serving older layout, interaction, or image-path patches.
html = html.replace(/<link rel="stylesheet" href="fixes\.css(?:\?v=[^"]*)?"\s*\/?>/g, "");
html = html.replace(/<script defer src="profile-access\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="image-fixes\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(
  "</head>",
  '<link rel="stylesheet" href="fixes.css?v=20260729-5"/></head>',
);
html = html.replace(
  "</body>",
  '<script defer src="profile-access.js?v=20260729-5"></script><script defer src="image-fixes.js?v=20260729-5"></script></body>',
);

await writeFile(indexPath, html);
console.log("Patched docs/index.html for GitHub Pages with cache-busted profile and image fixes.");
