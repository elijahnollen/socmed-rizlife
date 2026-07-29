(() => {
  const siteAsset = (path) => new URL(path.replace(/^\/+/, ""), document.baseURI).href;

  const portraitFiles = [
    "General Paciano Rizal.jpg",
    "Ferdinand Blumentritt.jpg",
    "Marcelo Hilario del Pilar y Gatmaitán (1850-1896) portrait.jpg",
    "Mariano Ponce.jpg",
    "Graciano lopez jaena PG.jpg",
    "Máximo Viola.jpg",
  ];

  const portraitUrls = portraitFiles.map(
    (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=240`,
  );

  const portraitStatus = new Map();

  function injectImageStyles() {
    if (document.getElementById("rizal-image-fix-styles")) return;

    const style = document.createElement("style");
    style.id = "rizal-image-fix-styles";
    style.textContent = `
      .friend-stack .avatar,
      .friend-grid .avatar,
      .large-friend-grid .avatar,
      .li-person .avatar {
        color: #fff !important;
        text-indent: 0 !important;
        background-image: none !important;
        background-color: #697386 !important;
        background-position: center top !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }

      .friend-stack .avatar.portrait-loaded,
      .friend-grid .avatar.portrait-loaded,
      .large-friend-grid .avatar.portrait-loaded,
      .li-person .avatar.portrait-loaded {
        color: transparent !important;
        text-indent: -9999px !important;
      }

      .friend-stack .avatar.portrait-failed,
      .friend-grid .avatar.portrait-failed,
      .large-friend-grid .avatar.portrait-failed,
      .li-person .avatar.portrait-failed {
        color: #fff !important;
        text-indent: 0 !important;
        background-image: linear-gradient(135deg, #667085, #344054) !important;
      }

      img.image-loading-fallback {
        background: #e4e6eb;
      }
    `;
    document.head.append(style);
  }

  function fixLocalImagePaths() {
    document.querySelectorAll("img").forEach((image) => {
      const rawSrc = image.getAttribute("src") || "";
      let localPath = "";

      if (rawSrc.startsWith("/images/")) {
        localPath = rawSrc.slice(1);
      } else {
        try {
          const parsed = new URL(image.src, document.baseURI);
          if (parsed.pathname.startsWith("/images/")) {
            localPath = parsed.pathname.slice(1);
          }
        } catch {
          return;
        }
      }

      if (localPath) image.src = siteAsset(localPath);

      if (!image.dataset.imageFallbackBound) {
        image.dataset.imageFallbackBound = "true";
        image.addEventListener("error", () => {
          if (image.dataset.localFallbackUsed) return;
          image.dataset.localFallbackUsed = "true";

          const current = image.getAttribute("src") || "";
          if (/jose-rizal-portrait/i.test(current)) {
            image.src = siteAsset("images/jose-rizal-personal.jpg");
            return;
          }

          if (/jose-rizal-personal/i.test(current)) {
            image.classList.add("image-loading-fallback");
            return;
          }

          const media = image.closest("figure.post-media");
          if (media) media.remove();
        });
      }
    });
  }

  function preloadPortrait(index) {
    if (portraitStatus.has(index)) return portraitStatus.get(index);

    const promise = new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve({ ok: true, url: portraitUrls[index] });
      probe.onerror = () => resolve({ ok: false, url: portraitUrls[index] });
      probe.src = portraitUrls[index];
    });

    portraitStatus.set(index, promise);
    return promise;
  }

  function applyPortraitGroup(selector) {
    const avatars = Array.from(document.querySelectorAll(selector));
    avatars.forEach((avatar, index) => {
      const portraitIndex = index % portraitUrls.length;
      if (avatar.dataset.portraitIndex === String(portraitIndex)) return;

      avatar.dataset.portraitIndex = String(portraitIndex);
      avatar.classList.remove("portrait-loaded", "portrait-failed");
      avatar.style.removeProperty("background-image");

      preloadPortrait(portraitIndex).then(({ ok, url }) => {
        if (!document.contains(avatar)) return;
        if (ok) {
          avatar.classList.add("portrait-loaded");
          avatar.classList.remove("portrait-failed");
          avatar.style.setProperty("background-image", `url("${url}")`, "important");
        } else {
          avatar.classList.add("portrait-failed");
          avatar.classList.remove("portrait-loaded");
          avatar.style.removeProperty("background-image");
        }
      });
    });
  }

  function applyFriendPortraits() {
    applyPortraitGroup(".friend-stack .avatar");
    applyPortraitGroup(".friend-grid .avatar");
    applyPortraitGroup(".large-friend-grid .avatar");
    applyPortraitGroup(".li-person .avatar");
  }

  function refreshImages() {
    fixLocalImagePaths();
    applyFriendPortraits();
  }

  function initialize() {
    injectImageStyles();
    refreshImages();
    [100, 350, 800, 1500].forEach((delay) => setTimeout(refreshImages, delay));

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        refreshImages();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
