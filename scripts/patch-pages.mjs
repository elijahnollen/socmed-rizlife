import { readFile, writeFile } from "node:fs/promises";

// Keep the generated static page compatible with repository-based GitHub Pages.
const indexPath = new URL("../docs/index.html", import.meta.url);
let html = await readFile(indexPath, "utf8");

html = html.replaceAll('import("/assets/', 'import("./assets/');

// Always use cache-busted profile fixes so GitHub Pages and browsers do not
// continue serving older layout, interaction, image, activity, or cover patches.
html = html.replace(/<link rel="stylesheet" href="fixes\.css(?:\?v=[^"]*)?"\s*\/?>/g, "");
html = html.replace(/<script defer src="profile-access\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="image-fixes\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="social-upgrades\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="facebook-cover-upload\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(
  "</head>",
  '<link rel="stylesheet" href="fixes.css?v=20260730-7"/></head>',
);
html = html.replace(
  "</body>",
  '<script defer src="profile-access.js?v=20260730-7"></script><script defer src="image-fixes.js?v=20260730-7"></script><script defer src="social-upgrades.js?v=20260730-7"></script><script defer src="facebook-cover-upload.js?v=20260730-7"></script></body>',
);

await writeFile(indexPath, html);
console.log("Patched docs/index.html with the uploaded Facebook cover and versioned social profile upgrades.");
