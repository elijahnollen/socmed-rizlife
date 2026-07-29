(() => {
  const FB_HASH = "#facebook";
  const LINKEDIN_HASH = "#linkedin";
  const asset = (path) => new URL(path.replace(/^\/+/, ""), document.baseURI).href;

  const extraPosts = [
    {
      id: "talisay-school",
      date: "15 November 1895",
      place: "Talisay, Dapitan",
      caption:
        "Our little school continues to grow. The boys study reading, languages, mathematics, surveying, and natural science, but they also work in the garden and learn to build with their own hands. Education should prepare a person to think and to serve.",
      reactions: 1328,
      shares: 142,
      comments: [
        ["José Aseniero", "JA", "The surveying lesson was difficult today, Maestro, but we will try again tomorrow."],
        ["Ferdinand Blumentritt", "FB", "Your school joins knowledge with useful work. I hope you will write more about its progress."],
      ],
    },
    {
      id: "dapitan-clinic",
      date: "2 February 1896",
      place: "Dapitan, Mindanao",
      caption:
        "The morning was spent attending to patients from the town and nearby barrios. Some could pay, others brought produce, and several had nothing to offer. Medicine must remain a service before it becomes a profession.",
      reactions: 1642,
      shares: 176,
      comments: [
        ["Paciano Rizal", "PR", "Your work there continues to bring honor to our family, Pepe."],
        ["Josephine Bracken", "JB", "The patients were already waiting before sunrise. It was a full day."],
      ],
    },
    {
      id: "dapitan-science",
      date: "10 April 1896",
      place: "Talisay, Dapitan",
      caption:
        "I collected several specimens after the rain and made notes on the plants and insects around Talisay. Exile has given me fewer libraries, but nature itself remains an immense book open to careful observation.",
      reactions: 1189,
      shares: 121,
      comments: [
        ["Ferdinand Blumentritt", "FB", "Please preserve your notes carefully. Your observations from Mindanao are valuable."],
        ["José Aseniero", "JA", "We found another unusual beetle near the trees, Maestro."],
      ],
    },
    {
      id: "cuba-service",
      date: "21 June 1896",
      place: "Dapitan, Mindanao",
      caption:
        "I have offered my services as a physician for Cuba, where illness has created a great need for medical workers. I hope this request will allow me to practice my profession freely and to help those who are suffering.",
      reactions: 2034,
      shares: 286,
      comments: [
        ["Paciano Rizal", "PR", "May this path bring you safely back to useful work and greater freedom."],
        ["Ferdinand Blumentritt", "FB", "Your intention is generous. I pray the journey and the decision of the authorities favor you."],
      ],
    },
    {
      id: "leaving-dapitan",
      date: "31 July 1896",
      place: "Dapitan, Mindanao",
      caption:
        "Today I leave Dapitan after four years. I carry with me the memory of my pupils, patients, neighbors, and the work we completed together. A place of exile became a place of service, friendship, and learning.",
      reactions: 2846,
      shares: 417,
      comments: [
        ["José Aseniero", "JA", "We will continue the lessons and care for what you built here, Maestro."],
        ["Josephine Bracken", "JB", "Dapitan will always remain part of our life and our work."],
      ],
    },
  ];

  function injectRuntimeStyles() {
    if (document.getElementById("rizal-runtime-styles")) return;
    const style = document.createElement("style");
    style.id = "rizal-runtime-styles";
    style.textContent = `
      .fb-cover::before{display:none!important;content:none!important}
      .fb-cover{height:348px!important;background-color:#18191a!important;isolation:auto!important}
      .fb-cover>img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important;object-position:center 26%!important}
      .fb-cover::after{background:linear-gradient(to bottom,transparent 68%,rgba(0,0,0,.38))!important}
      .native-platform-switch{display:inline-flex;align-items:center;gap:7px;min-height:36px;padding:0 12px;border-radius:7px;font-weight:700;white-space:nowrap}
      .fb-actions .native-platform-switch{background:#e4e6eb;color:#050505}
      .linkedin-topbar .native-platform-switch{background:#0a66c2;color:#fff;margin-left:8px}
      .native-platform-switch .switch-brand{display:grid;width:23px;height:23px;place-items:center;border-radius:4px;background:#0a66c2;color:#fff;font-size:12px;font-weight:800}
      .linkedin-topbar .native-platform-switch .switch-brand{background:#1877f2;font-family:Arial Black,Arial,sans-serif;font-size:17px}
      .li-activity-grid article{cursor:pointer;transition:box-shadow .15s ease,transform .15s ease}
      .li-activity-grid article:hover{box-shadow:0 0 0 2px rgba(10,102,194,.25);transform:translateY(-1px)}
      .li-post-viewer-backdrop{position:fixed;z-index:20000;inset:0;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.72)}
      .li-post-viewer{position:relative;width:min(760px,100%);max-height:90vh;overflow:auto;border-radius:10px;background:#fff;box-shadow:0 20px 70px rgba(0,0,0,.4)}
      .li-post-viewer header{display:flex;align-items:center;gap:12px;padding:20px 22px;border-bottom:1px solid #e0e0e0}
      .li-post-viewer header img{width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:center 14%}
      .li-post-viewer header div{min-width:0;flex:1}.li-post-viewer header strong{display:block;font-size:17px}.li-post-viewer header span{color:rgba(0,0,0,.6);font-size:13px}
      .li-post-viewer .viewer-body{padding:24px 22px 28px;font-size:18px;line-height:1.55;white-space:pre-wrap}
      .li-post-viewer .viewer-actions{display:flex;justify-content:space-around;border-top:1px solid #e0e0e0;padding:8px 14px}
      .li-post-viewer .viewer-actions button{flex:1;padding:12px;background:transparent;color:rgba(0,0,0,.7);font-weight:700}
      .li-post-viewer-close{position:absolute;z-index:2;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:#eef0f2;font-size:25px;line-height:1}
      .rizal-extra-post .post-avatar{object-fit:cover;object-position:center 18%}
      body.profile-modal-open{overflow:hidden}
      @media(max-width:900px){.fb-cover{height:300px!important}.native-platform-switch .switch-label{display:none}}
      @media(max-width:640px){.fb-cover{height:220px!important}.fb-cover>img{object-position:center 24%!important}.li-post-viewer-backdrop{padding:0}.li-post-viewer{width:100%;height:100%;max-height:none;border-radius:0}}
    `;
    document.head.append(style);
  }

  function getButtons() {
    return {
      facebook: document.querySelector(".project-switcher .fb-choice"),
      linkedin: document.querySelector(".project-switcher .in-choice"),
    };
  }

  function syncHash(platform) {
    const nextHash = platform === "linkedin" ? LINKEDIN_HASH : FB_HASH;
    if (window.location.hash !== nextHash) history.replaceState(null, "", nextHash);
  }

  function openPlatform(platform) {
    const buttons = getButtons();
    const button = platform === "linkedin" ? buttons.linkedin : buttons.facebook;
    syncHash(platform);
    if (button) button.click();
  }

  function enhanceHiddenSwitcher() {
    const { facebook, linkedin } = getButtons();
    if (!facebook || !linkedin) return false;
    facebook.type = "button";
    linkedin.type = "button";
    if (!facebook.dataset.profileAccessEnhanced) {
      facebook.addEventListener("click", () => syncHash("facebook"));
      linkedin.addEventListener("click", () => syncHash("linkedin"));
      facebook.dataset.profileAccessEnhanced = "true";
      linkedin.dataset.profileAccessEnhanced = "true";
    }
    return true;
  }

  function addPlatformButtons() {
    const fbActions = document.querySelector(".facebook-app .fb-actions");
    if (fbActions && !document.getElementById("open-linkedin-profile")) {
      const button = document.createElement("button");
      button.id = "open-linkedin-profile";
      button.className = "native-platform-switch";
      button.type = "button";
      button.innerHTML = '<span class="switch-brand">in</span><span class="switch-label">LinkedIn</span>';
      button.addEventListener("click", () => openPlatform("linkedin"));
      fbActions.prepend(button);
    }

    const linkedInNav = document.querySelector(".linkedin-app .linkedin-topbar nav");
    if (linkedInNav && !document.getElementById("open-facebook-profile")) {
      const button = document.createElement("button");
      button.id = "open-facebook-profile";
      button.className = "native-platform-switch";
      button.type = "button";
      button.innerHTML = '<span class="switch-brand">f</span><span class="switch-label">Facebook</span>';
      button.addEventListener("click", () => openPlatform("facebook"));
      linkedInNav.append(button);
    }
  }

  function fixFacebookCover() {
    const cover = document.querySelector(".fb-cover");
    if (!cover) return;
    cover.style.height = window.innerWidth <= 640 ? "220px" : window.innerWidth <= 900 ? "300px" : "348px";
  }

  function removePresentDayMonument() {
    document.querySelectorAll('img[src*="rizal-shrine-dapitan"]').forEach((image) => {
      const postMedia = image.closest(".post-media");
      if (postMedia) {
        postMedia.remove();
      } else {
        image.src = asset("images/jose-rizal-portrait.jpg");
        image.alt = "Portrait of José Rizal";
      }
    });
  }

  function cleanProjectOnlyCopy() {
    document.querySelectorAll(".fact-box").forEach((node) => node.remove());
    document.querySelectorAll('.linkedin-topbar a[href="#sources"]').forEach((node) => node.remove());
    document.querySelectorAll(".friends-card .section-title-row p").forEach((node) => node.remove());
    document.querySelectorAll("em").forEach((node) => {
      if (/simulated|activity|imagined/i.test(node.textContent || "")) node.remove();
    });
    document.querySelectorAll(".li-section-header p").forEach((node) => {
      node.textContent = (node.textContent || "").replace(/\s*·\s*simulated for the activity/gi, "");
    });
    const leftFooter = document.querySelector(".left-footer");
    if (leftFooter) leftFooter.textContent = "Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta © 2026";
    const linkedInFooter = document.querySelector(".linkedin-aside footer");
    if (linkedInFooter) linkedInFooter.innerHTML = "About · Accessibility · Help Center · Privacy & Terms<br><strong><span>Linked</span>in</strong> Corporation © 2026";
  }

  function createComment([name, initials, text]) {
    return `<div class="comment"><span class="avatar initials comment-avatar">${initials}</span><div><div class="comment-bubble"><strong>${name}</strong><p>${text}</p></div><div class="comment-meta"><button>Like</button><button>Reply</button></div></div></div>`;
  }

  function createFacebookPost(post) {
    const article = document.createElement("article");
    article.className = "fb-card fb-post rizal-extra-post";
    article.dataset.rizalExtra = post.id;
    article.innerHTML = `
      <header class="post-header">
        <img class="avatar post-avatar" src="${asset("images/jose-rizal-personal.jpg")}" alt="José Rizal">
        <div><h3>José Rizal</h3><p>${post.date} · ${post.place} · ◉</p></div>
        <button class="icon-button post-more" aria-label="Post options">•••</button>
      </header>
      <p class="post-caption">${post.caption}</p>
      <div class="post-stats">
        <span><span class="reaction-bubble">👍</span><span class="reaction-heart">♥</span><span class="extra-reaction-count">${post.reactions.toLocaleString()}</span></span>
        <button class="extra-comment-count">${post.comments.length} comments</button>
        <span>${post.shares} shares</span>
      </div>
      <div class="post-actions">
        <button class="extra-like">♡ Like</button>
        <button class="extra-comment">▢ Comment</button>
        <button>↗ Share</button>
      </div>
      <div class="comments">${post.comments.map(createComment).join("")}<div class="comment-compose"><img class="avatar comment-avatar" src="${asset("images/jose-rizal-personal.jpg")}" alt="José Rizal"><span>Write a comment…</span></div></div>
    `;

    const comments = article.querySelector(".comments");
    const countButton = article.querySelector(".extra-comment-count");
    const commentButton = article.querySelector(".extra-comment");
    const likeButton = article.querySelector(".extra-like");
    const reactionCount = article.querySelector(".extra-reaction-count");
    countButton?.addEventListener("click", () => {
      comments.style.display = comments.style.display === "none" ? "block" : "none";
    });
    commentButton?.addEventListener("click", () => {
      comments.style.display = "block";
      comments.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    likeButton?.addEventListener("click", () => {
      const liked = likeButton.classList.toggle("liked");
      likeButton.textContent = liked ? "👍 Liked" : "♡ Like";
      reactionCount.textContent = (post.reactions + (liked ? 1 : 0)).toLocaleString();
    });
    return article;
  }

  function addFacebookPosts() {
    const feed = document.querySelector(".facebook-feed");
    if (!feed) return;
    extraPosts.forEach((post) => {
      if (!feed.querySelector(`[data-rizal-extra="${post.id}"]`)) feed.append(createFacebookPost(post));
    });
  }

  function closePostViewer() {
    document.querySelector(".li-post-viewer-backdrop")?.remove();
    document.body.classList.remove("profile-modal-open");
  }

  function openLinkedInPost(article) {
    closePostViewer();
    const text = article.querySelector("p")?.textContent?.trim() || "";
    const meta = article.querySelector(".li-activity-author span")?.textContent?.trim() || "José Rizal";
    const backdrop = document.createElement("div");
    backdrop.className = "li-post-viewer-backdrop";
    backdrop.innerHTML = `
      <article class="li-post-viewer" role="dialog" aria-modal="true" aria-label="José Rizal LinkedIn post">
        <button class="li-post-viewer-close" aria-label="Close post">×</button>
        <header><img src="${asset("images/jose-rizal-portrait.jpg")}" alt="José Rizal"><div><strong>José Rizal</strong><span>${meta}</span></div></header>
        <div class="viewer-body">${text}</div>
        <div class="viewer-actions"><button>Like</button><button>Comment</button><button>Repost</button><button>Send</button></div>
      </article>
    `;
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closePostViewer();
    });
    backdrop.querySelector(".li-post-viewer-close")?.addEventListener("click", closePostViewer);
    document.body.append(backdrop);
    document.body.classList.add("profile-modal-open");
  }

  function enableLinkedInPostViewer() {
    document.querySelectorAll(".li-activity-grid article").forEach((article) => {
      if (article.dataset.maximizeEnabled) return;
      article.dataset.maximizeEnabled = "true";
      article.tabIndex = 0;
      article.setAttribute("role", "button");
      article.setAttribute("aria-label", "Open full LinkedIn post");
      article.addEventListener("click", () => openLinkedInPost(article));
      article.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLinkedInPost(article);
        }
      });
    });
  }

  function refresh() {
    enhanceHiddenSwitcher();
    addPlatformButtons();
    fixFacebookCover();
    removePresentDayMonument();
    cleanProjectOnlyCopy();
    addFacebookPosts();
    enableLinkedInPostViewer();
  }

  function initialize() {
    injectRuntimeStyles();
    refresh();
    const requested = window.location.hash.toLowerCase() === LINKEDIN_HASH ? "linkedin" : "facebook";
    [100, 450, 1000].forEach((delay) => setTimeout(() => {
      enhanceHiddenSwitcher();
      openPlatform(requested);
      refresh();
    }, delay));

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        refresh();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", fixFacebookCover);
    window.addEventListener("hashchange", () => {
      const platform = window.location.hash.toLowerCase() === LINKEDIN_HASH ? "linkedin" : "facebook";
      openPlatform(platform);
      setTimeout(refresh, 50);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePostViewer();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
