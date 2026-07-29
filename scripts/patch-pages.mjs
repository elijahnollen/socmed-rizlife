import { readFile, writeFile, unlink } from "node:fs/promises";

const version = "20260730-8";
const uploadedCover = "images/rizal-facebook-cover.jpg";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

async function write(path, content) {
  await writeFile(new URL(path, import.meta.url), content);
}

let html = await read("../docs/index.html");
html = html.replaceAll('import("/assets/', 'import("./assets/');
html = html.replace(
  /(<div class="fb-cover"><img src=")[^"]+(" alt=")[^"]*(")/,
  `$1${uploadedCover}$2José Rizal with fellow Filipino ilustrados$3`,
);

if (!html.includes(`rel="preload" as="image" href="${uploadedCover}"`)) {
  html = html.replace(
    '<link rel="preload" as="image" href="images/jose-rizal-personal.jpg"/>',
    `<link rel="preload" as="image" href="${uploadedCover}"/><link rel="preload" as="image" href="images/jose-rizal-personal.jpg"/>`,
  );
}

html = html.replace(/<link rel="stylesheet" href="fixes\.css(?:\?v=[^"]*)?"\s*\/?>/g, "");
html = html.replace(/<script defer src="profile-access\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="image-fixes\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="social-upgrades\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace(/<script defer src="facebook-cover-upload\.js(?:\?v=[^"]*)?"><\/script>/g, "");
html = html.replace("</head>", `<link rel="stylesheet" href="fixes.css?v=${version}"/></head>`);
html = html.replace(
  "</body>",
  `<script defer src="profile-access.js?v=${version}"></script><script defer src="image-fixes.js?v=${version}"></script><script defer src="social-upgrades.js?v=${version}"></script></body>`,
);
await write("../docs/index.html", html);

for (const path of ["../docs/fixes.css", "../app/fixes.css"]) {
  let css = await read(path);
  css = css.replace(
    /background-image:\s*url\(["']?\/?images\/ilustrados-1890\.jpg["']?\)\s*!important;/g,
    `background-image: url("${path.includes("app/") ? "/" : ""}${uploadedCover}") !important;`,
  );
  css = css.replace(/background-position:\s*center\s+(?:25|28|30)%\s*!important;/g, "background-position: center center !important;");
  await write(path, css);
}

let profile = await read("../docs/profile-access.js");
profile = profile.replace(
  '.fb-cover{height:348px!important;background:#18191a!important;isolation:auto!important}',
  '.fb-cover{height:348px!important;background-color:#18191a!important;isolation:auto!important}',
);
profile = profile.replace(
  /  function fixFacebookCover\(\) \{[\s\S]*?\n  \}\n\n  function removePresentDayMonument\(\) \{/,
  `  function fixFacebookCover() {\n    const cover = document.querySelector(".fb-cover");\n    if (!cover) return;\n    cover.style.height = window.innerWidth <= 640 ? "220px" : window.innerWidth <= 900 ? "300px" : "348px";\n  }\n\n  function removePresentDayMonument() {`,
);
await write("../docs/profile-access.js", profile);

let upgrades = await read("../docs/social-upgrades.js");
upgrades = upgrades.replace(
  'facebookCover.style.setProperty("background-image", `url("${asset("images/ilustrados-1890.jpg")}")`, "important");',
  `facebookCover.style.setProperty("background-image", \`url("\${asset("${uploadedCover}")}")\`, "important");`,
);
upgrades = upgrades.replace(
  'facebookCover.style.setProperty("background-position", "center 30%", "important");',
  'facebookCover.style.setProperty("background-position", "center center", "important");',
);
await write("../docs/social-upgrades.js", upgrades);

try {
  await unlink(new URL("../docs/facebook-cover-upload.js", import.meta.url));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

console.log(`Patched GitHub Pages assets with stable Facebook cover version ${version}.`);
