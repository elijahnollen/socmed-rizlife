(() => {
  const asset = (path) => new URL(path.replace(/^\/+/, ""), document.baseURI).href;

  const linkedInPosts = [
    {
      id: "noli-berlin",
      date: "29 March 1887",
      place: "Berlin, German Empire",
      body: "The first copies of Noli Me Tangere have come from the press in Berlin. I wrote this book so that my countrymen might look upon the condition of our society with clear eyes. Truth can wound, but silence permits the illness to deepen. I remain grateful to Máximo Viola, whose assistance made the printing possible.",
      image: "images/noli-me-tangere.jpg",
      imageAlt: "Historic cover of Noli Me Tangere",
      reactions: 1847,
      comments: [
        ["Máximo Viola", "MV", "The book deserves every sacrifice, Pepe. May it reach readers who are prepared to face its truths."],
        ["Ferdinand Blumentritt", "FB", "Your purpose is serious and worthy. I await the volume with great interest."],
      ],
    },
    {
      id: "morga-london",
      date: "24 May 1888",
      place: "London, United Kingdom",
      body: "My days in London are spent among old chronicles at the British Museum. In the pages of Antonio de Morga I find evidence that our people possessed laws, commerce, learning, and a culture of their own before Spanish rule. To recover this memory is to restore a portion of our dignity.",
      image: "images/ilustrados-1890.jpg",
      imageAlt: "Filipino ilustrados in Europe around 1890",
      reactions: 1326,
      comments: [
        ["Mariano Ponce", "MP", "A people strengthened by memory will better understand its present condition."],
        ["Marcelo H. del Pilar", "MD", "Historical study can also become a form of reform."],
      ],
    },
    {
      id: "fili-ghent",
      date: "18 September 1891",
      place: "Ghent, Belgium",
      body: "El Filibusterismo is now printed in Ghent. It is a sterner work than the Noli because the sickness I have observed has grown more serious. I dedicate it to Fathers Gómez, Burgos, and Zamora, whose fate must not be forgotten.",
      image: "images/el-filibusterismo-manuscript.jpg",
      imageAlt: "First manuscript page of El Filibusterismo",
      reactions: 2214,
      comments: [
        ["Valentín Ventura", "VV", "It was an honor to help the printing continue. May the work reach the people for whom it was written."],
        ["Ferdinand Blumentritt", "FB", "Its warning is grave. I hope wisdom answers before suffering grows."],
      ],
    },
    {
      id: "liga-tondo",
      date: "3 July 1892",
      place: "Tondo, Manila",
      body: "Tonight we organized La Liga Filipina in Tondo. Its purpose is peaceful and practical: unity, mutual aid, education, agriculture, commerce, and defense against injustice. Love of country must be shown not only in words, but also in organized service.",
      image: "images/jose-rizal-personal.jpg",
      imageAlt: "Portrait of José Rizal",
      reactions: 3041,
      comments: [
        ["Paciano Rizal", "PR", "A union founded on service and discipline can give our countrymen lasting strength."],
        ["Mariano Ponce", "MP", "May the Liga turn patriotic thought into steady work in every province."],
      ],
    },
    {
      id: "leaving-dapitan",
      date: "31 July 1896",
      place: "Dapitan, Mindanao",
      body: "I leave Dapitan today after more than four fruitful years. Here I practiced medicine, taught the young, studied nature, cultivated the land, and worked with my neighbors. Exile limited my movements, but it did not prevent useful labor. I now go forward to offer my services as a physician.",
      image: "images/jose-rizal-portrait.jpg",
      imageAlt: "Formal portrait of José Rizal",
      reactions: 4196,
      comments: [
        ["Josephine Bracken", "JB", "The patients, pupils, and families of Dapitan will remember the work completed here."],
        ["José Aseniero", "JA", "We will continue our lessons and care for what you built, Maestro."],
      ],
    },
  ];

  function injectStyles() {
    if (document.getElementById("social-upgrade-styles")) return;
    const style = document.createElement("style");
    style.id = "social-upgrade-styles";
    style.textContent = `
      .fb-cover{background-color:#18191a!important;background-repeat:no-repeat!important;background-size:cover!important;background-position:center 30%!important}
      .fb-cover::before,.fb-cover::after{display:none!important;content:none!important;background:none!important}
      .fb-cover>img{display:none!important}
      .li-cover{height:220px!important;background-color:#263746!important;background-repeat:no-repeat!important;background-size:cover!important;background-position:center 32%!important}
      .li-cover>img{display:none!important}
      .li-cover-overlay{display:block!important;background:linear-gradient(110deg,rgba(3,34,61,.76),rgba(10,102,194,.10) 60%,rgba(0,0,0,.28))!important}
      .li-activity-grid.upgraded-activity{display:flex!important;flex-direction:column!important;margin:0 -24px!important;border-top:1px solid #e0dfdc!important}
      .li-activity-grid.upgraded-activity .li-upgrade-post{display:block!important;padding:16px 24px 0!important;border-right:0!important;border-bottom:1px solid #e0dfdc!important;cursor:pointer!important;background:#fff!important}
      .li-activity-grid.upgraded-activity .li-upgrade-post:hover{background:#f8f9fa!important;box-shadow:none!important;transform:none!important}
      .li-upgrade-author{display:flex;align-items:center;gap:10px}
      .li-upgrade-author img{width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:center 15%;background:#e4e6eb}
      .li-upgrade-author>div{min-width:0;flex:1}.li-upgrade-author strong{display:block;font-size:14px;color:rgba(0,0,0,.9)}
      .li-upgrade-author span{display:block;margin-top:2px;color:rgba(0,0,0,.58);font-size:12px;line-height:1.3}
      .li-upgrade-menu{align-self:flex-start;padding:5px 8px;background:transparent;font-size:20px;color:rgba(0,0,0,.6)}
      .li-upgrade-post-body{margin:12px 0 14px!important;font-size:14px!important;line-height:1.5!important;display:block!important;overflow:visible!important;-webkit-line-clamp:unset!important}
      .li-upgrade-media{max-height:430px;overflow:hidden;margin:0 -24px;background:#e8e2d7;border-top:1px solid #e0dfdc;border-bottom:1px solid #e0dfdc}
      .li-upgrade-media img{width:100%;max-height:430px;object-fit:cover}
      .li-upgrade-post[data-post-id="noli-berlin"] .li-upgrade-media img,.li-upgrade-post[data-post-id="fili-ghent"] .li-upgrade-media img{object-fit:contain;padding:18px;background:#e8e2d7}
      .li-upgrade-post[data-post-id="liga-tondo"] .li-upgrade-media img,.li-upgrade-post[data-post-id="leaving-dapitan"] .li-upgrade-media img{object-position:center 18%}
      .li-upgrade-stats{display:flex;align-items:center;justify-content:space-between;padding:10px 0;color:rgba(0,0,0,.58);font-size:12px}
      .li-upgrade-reactions{display:flex;align-items:center;gap:5px}.li-reaction-icons{font-size:15px;letter-spacing:-5px;margin-right:5px}
      .li-upgrade-actions{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #e0dfdc;padding:4px 0}
      .li-upgrade-actions button{min-height:42px;background:transparent;color:rgba(0,0,0,.65);font-size:13px;font-weight:600;border-radius:4px}
      .li-upgrade-actions button:hover{background:#eef0f2}.li-upgrade-actions button.liked{color:#0a66c2}
      .li-upgrade-comments{display:grid;gap:10px;padding:10px 0 16px;border-top:1px solid #e0dfdc}
      .li-upgrade-comment{display:flex;align-items:flex-start;gap:8px}
      .li-comment-avatar{display:grid;width:34px;height:34px;flex:0 0 auto;place-items:center;border-radius:50%;background:#536779;color:#fff;font-size:11px;font-weight:700}
      .li-comment-bubble{flex:1;padding:8px 11px;border-radius:0 12px 12px 12px;background:#f2f2f2}
      .li-comment-bubble strong{display:block;font-size:12px}.li-comment-bubble p{margin:3px 0 0;font-size:12px;line-height:1.4}
      .li-upgrade-post-count{font-weight:600;color:rgba(0,0,0,.62)}
      .li-full-post .viewer-body{padding-bottom:12px!important}.li-full-post .viewer-media{background:#e8e2d7;border-top:1px solid #e0dfdc;border-bottom:1px solid #e0dfdc}
      .li-full-post .viewer-media img{display:block;width:100%;max-height:520px;object-fit:contain}
      .li-full-post .viewer-comments{display:grid;gap:10px;padding:16px 22px 22px}
      @media(max-width:700px){.li-upgrade-actions button{font-size:11px}.li-upgrade-media{margin:0 -16px}.li-activity-grid.upgraded-activity .li-upgrade-post{padding-left:16px!important;padding-right:16px!important}.li-cover{height:180px!important}}
    `;
    document.head.append(style);
  }

  function fixCovers() {
    const facebookCover = document.querySelector(".fb-cover");
    if (facebookCover) {
      facebookCover.style.setProperty("background-image", `url("${asset("images/rizal-facebook-cover.jpg")}")`, "important");
      facebookCover.style.setProperty("background-size", "cover", "important");
      facebookCover.style.setProperty("background-position", "center center", "important");
      facebookCover.querySelector("img")?.style.setProperty("display", "none", "important");
    }

    const linkedInCover = document.querySelector(".li-cover");
    if (linkedInCover) {
      linkedInCover.style.setProperty("background-image", `url("${asset("images/ilustrados-1890.jpg")}")`, "important");
      linkedInCover.style.setProperty("background-size", "cover", "important");
      linkedInCover.style.setProperty("background-position", "center 32%", "important");
      linkedInCover.querySelector("img")?.style.setProperty("display", "none", "important");
    }
  }

  function removeEmDashes() {
    document.querySelectorAll(".post-caption,.li-upgrade-post-body,.li-comment-bubble p").forEach((node) => {
      node.textContent = (node.textContent || "").replaceAll("—", ", ");
    });
  }

  function commentMarkup([name, initials, text]) {
    return `<div class="li-upgrade-comment"><span class="li-comment-avatar">${initials}</span><div class="li-comment-bubble"><strong>${name}</strong><p>${text}</p></div></div>`;
  }

  function mediaMarkup(post) {
    if (!post.image) return "";
    return `<div class="li-upgrade-media"><img src="${asset(post.image)}" alt="${post.imageAlt}"></div>`;
  }

  function createPost(post) {
    const article = document.createElement("article");
    article.className = "li-upgrade-post";
    article.dataset.postId = post.id;
    article.dataset.maximizeEnabled = "true";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Open José Rizal post from ${post.date}`);
    article.innerHTML = `
      <div class="li-upgrade-author">
        <img src="${asset("images/jose-rizal-portrait.jpg")}" alt="José Rizal">
        <div><strong>José Rizal</strong><span>Ophthalmologist, novelist, educator<br>${post.date} · ${post.place} · 🌐</span></div>
        <button class="li-upgrade-menu" aria-label="Post options">•••</button>
      </div>
      <p class="li-upgrade-post-body">${post.body}</p>
      ${mediaMarkup(post)}
      <div class="li-upgrade-stats">
        <span class="li-upgrade-reactions"><span class="li-reaction-icons">👍❤️💡</span><span class="li-reaction-count">${post.reactions.toLocaleString()}</span></span>
        <span>${post.comments.length} comments · ${Math.floor(post.reactions / 9)} reposts</span>
      </div>
      <div class="li-upgrade-actions">
        <button class="li-upgrade-like">♡ Like</button><button>Comment</button><button>↻ Repost</button><button>✉ Send</button>
      </div>
      <div class="li-upgrade-comments">${post.comments.map(commentMarkup).join("")}</div>
    `;

    const like = article.querySelector(".li-upgrade-like");
    const count = article.querySelector(".li-reaction-count");
    like?.addEventListener("click", (event) => {
      event.stopPropagation();
      const liked = like.classList.toggle("liked");
      like.textContent = liked ? "👍 Liked" : "♡ Like";
      count.textContent = (post.reactions + (liked ? 1 : 0)).toLocaleString();
    });
    article.querySelectorAll("button").forEach((button) => {
      if (button !== like) button.addEventListener("click", (event) => event.stopPropagation());
    });
    article.addEventListener("click", () => openFullPost(post));
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFullPost(post);
      }
    });
    return article;
  }

  function closeFullPost() {
    document.querySelector(".li-post-viewer-backdrop.social-upgrade-modal")?.remove();
    document.body.classList.remove("profile-modal-open");
  }

  function openFullPost(post) {
    closeFullPost();
    const backdrop = document.createElement("div");
    backdrop.className = "li-post-viewer-backdrop social-upgrade-modal";
    backdrop.innerHTML = `
      <article class="li-post-viewer li-full-post" role="dialog" aria-modal="true" aria-label="José Rizal LinkedIn post">
        <button class="li-post-viewer-close" aria-label="Close post">×</button>
        <header><img src="${asset("images/jose-rizal-portrait.jpg")}" alt="José Rizal"><div><strong>José Rizal</strong><span>${post.date} · ${post.place}</span></div></header>
        <div class="viewer-body">${post.body}</div>
        ${post.image ? `<div class="viewer-media"><img src="${asset(post.image)}" alt="${post.imageAlt}"></div>` : ""}
        <div class="li-upgrade-stats" style="padding:12px 22px"><span><span class="li-reaction-icons">👍❤️💡</span>${post.reactions.toLocaleString()}</span><span>${post.comments.length} comments</span></div>
        <div class="viewer-actions"><button>Like</button><button>Comment</button><button>Repost</button><button>Send</button></div>
        <div class="viewer-comments">${post.comments.map(commentMarkup).join("")}</div>
      </article>
    `;
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closeFullPost();
    });
    backdrop.querySelector(".li-post-viewer-close")?.addEventListener("click", closeFullPost);
    document.body.append(backdrop);
    document.body.classList.add("profile-modal-open");
  }

  function upgradeLinkedInActivity() {
    const activitySection = Array.from(document.querySelectorAll(".linkedin-section")).find(
      (section) => section.querySelector(".li-section-header h2")?.textContent?.trim() === "Activity",
    );
    if (!activitySection) return;

    const subtitle = activitySection.querySelector(".li-section-header p");
    if (subtitle) {
      subtitle.innerHTML = '<span class="li-upgrade-post-count">1,042 posts</span> · 2,846 followers';
    }

    const grid = activitySection.querySelector(".li-activity-grid");
    if (!grid || grid.dataset.activityUpgraded === "true") return;
    grid.dataset.activityUpgraded = "true";
    grid.classList.add("upgraded-activity");
    grid.replaceChildren(...linkedInPosts.map(createPost));

    const showAll = activitySection.querySelector(".show-all");
    if (showAll) showAll.innerHTML = "Show all 1,042 posts <span>→</span>";
  }

  function refresh() {
    fixCovers();
    upgradeLinkedInActivity();
    removeEmDashes();
  }

  function initialize() {
    injectStyles();
    refresh();
    [100, 350, 800, 1400].forEach((delay) => setTimeout(refresh, delay));
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
    window.addEventListener("hashchange", () => setTimeout(refresh, 50));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFullPost();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
