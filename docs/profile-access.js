(() => {
  const FB_HASH = "#facebook";
  const LINKEDIN_HASH = "#linkedin";

  const portraitCredits = [
    ["Paciano Rizal", "https://www.flickr.com/photos/nccaofficial/18483426949"],
    ["Ferdinand Blumentritt", "https://commons.wikimedia.org/wiki/File:Ferdinand_Blumentritt.jpg"],
    ["Marcelo H. del Pilar", "https://commons.wikimedia.org/wiki/File:Marcelo_H._del_Pilar_%28January_1%2C_1890%29.jpg"],
    ["Mariano Ponce", "https://commons.wikimedia.org/wiki/File:Mariano_Ponce.jpg"],
    ["Graciano López Jaena", "https://commons.wikimedia.org/wiki/File:Graciano_L%C3%B3pez_Jaena.jpg"],
    ["Máximo Viola", "https://commons.wikimedia.org/wiki/File:Dr._Maximo_Viola_y_Sison.jpg"],
  ];

  function addCredits() {
    if (document.querySelector(".portrait-credits")) return;

    const details = document.createElement("details");
    details.className = "portrait-credits";

    const summary = document.createElement("summary");
    summary.textContent = "Friend portrait sources and credits";

    const list = document.createElement("ul");
    portraitCredits.forEach(([name, url]) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = name;
      item.append(link);
      list.append(item);
    });

    details.append(summary, list);
    document.body.append(details);
  }

  function getButtons() {
    return {
      facebook: document.querySelector(".project-switcher .fb-choice"),
      linkedin: document.querySelector(".project-switcher .in-choice"),
    };
  }

  function syncHash(platform) {
    const nextHash = platform === "linkedin" ? LINKEDIN_HASH : FB_HASH;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, "", nextHash);
    }
  }

  function enhanceSwitcher() {
    const { facebook, linkedin } = getButtons();
    if (!facebook || !linkedin) return false;

    facebook.type = "button";
    linkedin.type = "button";
    facebook.setAttribute("aria-label", "Open José Rizal Facebook profile");
    linkedin.setAttribute("aria-label", "Open José Rizal LinkedIn profile");

    if (!facebook.dataset.profileAccessEnhanced) {
      facebook.addEventListener("click", () => syncHash("facebook"));
      linkedin.addEventListener("click", () => syncHash("linkedin"));
      facebook.dataset.profileAccessEnhanced = "true";
      linkedin.dataset.profileAccessEnhanced = "true";
    }

    if (!document.body.dataset.initialProfileOpened) {
      document.body.dataset.initialProfileOpened = "true";
      if (window.location.hash.toLowerCase() === LINKEDIN_HASH) {
        requestAnimationFrame(() => linkedin.click());
      }
    }

    return true;
  }

  function initialize() {
    enhanceSwitcher();
    addCredits();

    const observer = new MutationObserver(() => enhanceSwitcher());
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("hashchange", () => {
      const { facebook, linkedin } = getButtons();
      const hash = window.location.hash.toLowerCase();
      if (hash === LINKEDIN_HASH) linkedin?.click();
      if (hash === FB_HASH) facebook?.click();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
