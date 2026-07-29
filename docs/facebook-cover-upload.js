(() => {
  const uploadedCover = new URL("images/rizal-facebook-cover.jpg", document.baseURI).href;

  function applyUploadedFacebookCover() {
    const cover = document.querySelector(".facebook-app .fb-cover");
    if (!cover) return;

    cover.style.setProperty("background-image", `url("${uploadedCover}")`, "important");
    cover.style.setProperty("background-color", "#18191a", "important");
    cover.style.setProperty("background-repeat", "no-repeat", "important");
    cover.style.setProperty("background-size", "cover", "important");
    cover.style.setProperty("background-position", "center center", "important");

    const oldImage = cover.querySelector("img");
    if (oldImage) {
      oldImage.src = uploadedCover;
      oldImage.alt = "José Rizal with fellow Filipino ilustrados";
      oldImage.style.setProperty("display", "none", "important");
    }
  }

  function initialize() {
    applyUploadedFacebookCover();
    [100, 350, 800, 1500].forEach((delay) => setTimeout(applyUploadedFacebookCover, delay));

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        applyUploadedFacebookCover();
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
