(() => {
  const localAsset = (path) => new URL(path.replace(/^\/+/, ""), document.baseURI).href;
  const tuyoImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Pritong_Tuyo_%28Tamban%29.jpg/960px-Pritong_Tuyo_%28Tamban%29.jpg";

  const personalPosts = [
    {
      id: "tuyo-breakfast",
      date: "28 August 1895",
      place: "Dapitan, Mindanao",
      feeling: "feeling thankful",
      caption: "A simple breakfast today: rice and dried fish. I have written home asking for tokwa, monggo, and small dried fish because provisions here are sometimes scarce. Food sent by one’s family tastes better than any banquet abroad.",
      image: tuyoImage,
      imageAlt: "Fried tuyo, a Filipino dried fish dish",
      credit: "Photo by MarvinBikolano, CC BY-SA 4.0",
      reactions: 1872,
      shares: 84,
      comments: [
        ["Narcisa Rizal", "NR", "We will prepare another parcel for you, Pepe. Do not forget to eat properly."],
        ["Paciano Rizal", "PR", "A simple meal is enough when there is good work waiting afterward."],
      ],
    },
    {
      id: "birthday-dapitan",
      date: "19 June 1895",
      place: "Talisay, Dapitan",
      feeling: "feeling grateful",
      caption: "Another birthday far from Calamba. There are patients to visit, lessons to prepare, and trees that still need attention. I miss my family today, but useful work is good company.",
      image: localAsset("images/jose-rizal-personal.jpg"),
      imageAlt: "Warm-toned portrait of José Rizal",
      reactions: 2654,
      shares: 109,
      comments: [
        ["Paciano Rizal", "PR", "Your family remembers you today. Continue taking care of yourself as you care for others."],
        ["Josephine Bracken", "JB", "The pupils have been trying very hard not to reveal their little birthday surprise."],
      ],
    },
    {
      id: "muddy-shoes",
      date: "15 November 1895",
      place: "Talisay, Dapitan",
      feeling: "feeling amused",
      caption: "The boys laughed because I entered the lesson with mud on my shoes after checking the garden. I reminded them that geometry and gardening may belong to the same morning. They laughed again, but they finished the measurements correctly.",
      reactions: 1436,
      shares: 63,
      comments: [
        ["José Aseniero", "JA", "Maestro, the garden was more difficult than the geometry today."],
        ["Ferdinand Blumentritt", "FB", "Your pupils are fortunate to learn from books and from the earth."],
      ],
    },
    {
      id: "quiet-evening",
      date: "7 December 1895",
      place: "Dapitan, Mindanao",
      feeling: "feeling nostalgic",
      caption: "A quiet evening by the sea. The air is cooler now, and for a moment the sound of the water made me think of Laguna de Bay. Distance has a strange way of making the smallest memories feel precious.",
      reactions: 1789,
      shares: 96,
      comments: [
        ["Trinidad Rizal", "TR", "We think of you whenever the evening becomes quiet in Calamba."],
        ["Mariano Ponce", "MP", "A traveler may leave home, but home continues to travel with him."],
      ],
    },
    {
      id: "new-year-list",
      date: "1 January 1896",
      place: "Talisay, Dapitan",
      feeling: "feeling hopeful",
      caption: "My list for the new year is already too long: repair the water channel, organize the specimens, answer several letters, improve the school garden, and find more time to read. Perhaps the final item should be learning how to make shorter lists.",
      reactions: 2118,
      shares: 131,
      comments: [
        ["Josephine Bracken", "JB", "You forgot to add rest to the list again."],
        ["Ferdinand Blumentritt", "FB", "I suspect the letters alone will create another list."],
      ],
    },
    {
      id: "clinic-day",
      date: "2 February 1896",
      place: "Dapitan, Mindanao",
      feeling: "feeling tired",
      caption: "A full morning at the clinic. Some patients paid with money, some brought produce, and some had nothing. Illness does not ask whether a person can afford to be ill, so a physician must first see the patient and only afterward think of payment.",
      reactions: 2367,
      shares: 205,
      comments: [
        ["Josephine Bracken", "JB", "The first patients arrived before sunrise. Please rest this evening."],
        ["Paciano Rizal", "PR", "Your practice continues to show that service is greater than profit."],
      ],
    },
    {
      id: "lost-in-nature",
      date: "10 April 1896",
      place: "Talisay, Dapitan",
      feeling: "feeling curious",
      caption: "I went out only to inspect one plant and returned much later with notes on insects, shells, and three questions I cannot yet answer. Nature is an excellent teacher, though it rarely follows the lesson plan.",
      reactions: 1694,
      shares: 118,
      comments: [
        ["Ferdinand Blumentritt", "FB", "Please send the notes when you can. Your questions are usually as valuable as the specimens."],
        ["José Aseniero", "JA", "We knew it would not be only one plant, Maestro."],
      ],
    },
    {
      id: "sketch-break",
      date: "5 May 1896",
      place: "Dapitan, Mindanao",
      feeling: "feeling relaxed",
      caption: "I put aside my letters for a while and made a quick sketch. Drawing forces the eyes to slow down. One notices the curve of a leaf, the posture of a person, and many details that hurry normally hides.",
      reactions: 1521,
      shares: 72,
      comments: [
        ["Mariano Ponce", "MP", "You owe us a copy of the sketch, not merely a description of it."],
        ["Josephine Bracken", "JB", "He says quick sketch, but he has already corrected it several times."],
      ],
    },
    {
      id: "waiting-letter",
      date: "21 June 1896",
      place: "Dapitan, Mindanao",
      feeling: "feeling restless",
      caption: "Another letter sent, and now the difficult part begins: waiting for an answer. Writing gives the mind something to do. Waiting gives it far too much to imagine.",
      reactions: 1938,
      shares: 101,
      comments: [
        ["Paciano Rizal", "PR", "Whatever the answer may be, prepare carefully and remain patient."],
        ["Ferdinand Blumentritt", "FB", "I understand the impatience. News travels slowly when it matters most."],
      ],
    },
    {
      id: "farewell-dapitan",
      date: "31 July 1896",
      place: "Dapitan, Mindanao",
      feeling: "feeling emotional",
      caption: "Leaving Dapitan today. Four years ago it was only the place of my exile. Now I leave behind pupils, patients, neighbors, gardens, unfinished plans, and friendships that made this place a home.",
      reactions: 3427,
      shares: 319,
      comments: [
        ["José Aseniero", "JA", "We will continue our lessons and care for the garden, Maestro."],
        ["Josephine Bracken", "JB", "Dapitan will remain with us wherever the journey leads."],
      ],
    },
  ];

  function injectStyles() {
    if (document.getElementById("rizal-account-personality-styles")) return;
    const style = document.createElement("style");
    style.id = "rizal-account-personality-styles";
    style.textContent = `
      .facebook-feed > .fb-post:not(.personal-rizal-post){display:none!important}
      .personal-rizal-post{display:block!important}
      .personal-rizal-post .post-caption{white-space:normal}
      .personal-rizal-post .personal-feeling{font-weight:400;color:#65676b}
      .personal-rizal-post .post-media{position:relative;background:#ece4d7}
      .personal-rizal-post .post-media img{display:block;width:100%;max-height:560px;object-fit:cover}
      .personal-rizal-post .media-credit{position:absolute;right:8px;bottom:8px;padding:4px 7px;border-radius:5px;background:rgba(0,0,0,.68);color:#fff;font-size:10px}
      .personal-rizal-post .personal-media-fallback{display:none;min-height:260px;place-items:center;text-align:center;background:linear-gradient(135deg,#e8dcc6,#b79a72);font-size:72px}
      .personal-rizal-post.media-failed .personal-media-fallback{display:grid}
      .personal-rizal-post.media-failed .post-media img,.personal-rizal-post.media-failed .media-credit{display:none}
      .personal-account-label{margin:0 0 12px;padding:10px 12px;border-radius:8px;background:#e7f3ff;color:#0b57a3;font-size:13px;font-weight:600}
      .linkedin-professional-label{margin:8px 24px 14px;padding:10px 12px;border-left:3px solid #0a66c2;background:#f3f6f8;color:rgba(0,0,0,.72);font-size:13px}
    `;
    document.head.append(style);
  }

  function commentMarkup([name, initials, text]) {
    return `<div class="comment"><span class="avatar initials comment-avatar">${initials}</span><div><div class="comment-bubble"><strong>${name}</strong><p>${text}</p></div><div class="comment-meta"><button>Like</button><button>Reply</button></div></div></div>`;
  }

  function mediaMarkup(post) {
    if (!post.image) return "";
    return `<figure class="post-media"><img src="${post.image}" alt="${post.imageAlt || ""}">${post.credit ? `<figcaption class="media-credit">${post.credit}</figcaption>` : ""}<div class="personal-media-fallback" aria-label="Tuyo meal">🐟🍚</div></figure>`;
  }

  function createPost(post) {
    const article = document.createElement("article");
    article.className = "fb-card fb-post personal-rizal-post";
    article.dataset.personalPost = post.id;
    article.innerHTML = `
      <header class="post-header">
        <img class="avatar post-avatar" src="${localAsset("images/jose-rizal-personal.jpg")}" alt="José Rizal">
        <div><h3>José Rizal <span class="personal-feeling">is ${post.feeling}</span></h3><p>${post.date} · ${post.place} · ◉</p></div>
        <button class="icon-button post-more" aria-label="Post options">•••</button>
      </header>
      <p class="post-caption">${post.caption}</p>
      ${mediaMarkup(post)}
      <div class="post-stats"><span><span class="reaction-bubble">👍</span><span class="reaction-heart">♥</span><span class="personal-reaction-count">${post.reactions.toLocaleString()}</span></span><button class="personal-comment-count">${post.comments.length} comments</button><span>${post.shares} shares</span></div>
      <div class="post-actions"><button class="personal-like">♡ Like</button><button class="personal-comment">▢ Comment</button><button>↗ Share</button></div>
      <div class="comments">${post.comments.map(commentMarkup).join("")}<div class="comment-compose"><img class="avatar comment-avatar" src="${localAsset("images/jose-rizal-personal.jpg")}" alt="José Rizal"><span>Write a comment…</span></div></div>
    `;

    const mediaImage = article.querySelector(".post-media img");
    mediaImage?.addEventListener("error", () => article.classList.add("media-failed"), { once: true });

    const like = article.querySelector(".personal-like");
    const count = article.querySelector(".personal-reaction-count");
    like?.addEventListener("click", () => {
      const liked = like.classList.toggle("liked");
      like.textContent = liked ? "👍 Liked" : "♡ Like";
      count.textContent = (post.reactions + (liked ? 1 : 0)).toLocaleString();
    });

    const comments = article.querySelector(".comments");
    article.querySelector(".personal-comment")?.addEventListener("click", () => {
      comments.style.display = "block";
      comments.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    article.querySelector(".personal-comment-count")?.addEventListener("click", () => {
      comments.style.display = comments.style.display === "none" ? "block" : "none";
    });
    return article;
  }

  function personalizeFacebookIntro() {
    const intro = document.querySelector(".facebook-app .intro-card");
    if (!intro) return;
    const bio = intro.querySelector(".fb-bio");
    if (bio) bio.textContent = "Calambeño living in Dapitan. Doctor, teacher, gardener, reader, sketcher, and constant letter writer.";

    const list = intro.querySelector("ul");
    if (list && list.dataset.personalized !== "true") {
      list.dataset.personalized = "true";
      list.innerHTML = `
        <li>🏠 From <strong>Calamba, Laguna</strong></li>
        <li>📍 Lives in <strong>Dapitan</strong></li>
        <li>👨‍👩‍👧‍👦 Close to his <strong>large family</strong></li>
        <li>✉ Often writing <strong>letters to family and friends</strong></li>
        <li>🌿 Enjoys <strong>gardening, nature, sketching, reading, and fencing</strong></li>
        <li>🍚 Appreciates <strong>simple Filipino food</strong></li>
      `;
    }
  }

  function installFacebookPosts() {
    const feed = document.querySelector(".facebook-app .facebook-feed");
    if (!feed) return;

    const filter = feed.querySelector(".posts-filter");
    if (filter && !feed.querySelector(".personal-account-label")) {
      const label = document.createElement("p");
      label.className = "personal-account-label";
      label.textContent = "Personal posts · daily life, thoughts, family, food, hobbies, and friends";
      filter.insertAdjacentElement("afterend", label);
    }

    if (feed.querySelectorAll(".personal-rizal-post").length !== personalPosts.length) {
      feed.querySelectorAll(".personal-rizal-post").forEach((node) => node.remove());
      const anchor = feed.querySelector(".personal-account-label") || filter;
      personalPosts.slice().reverse().forEach((post) => anchor?.insertAdjacentElement("afterend", createPost(post)));
    }
  }

  function reinforceLinkedInProfessionalIdentity() {
    const activity = Array.from(document.querySelectorAll(".linkedin-section")).find(
      (section) => section.querySelector(".li-section-header h2")?.textContent?.trim() === "Activity",
    );
    if (!activity || activity.querySelector(".linkedin-professional-label")) return;
    const label = document.createElement("p");
    label.className = "linkedin-professional-label";
    label.textContent = "Professional activity · publications, research, medicine, education, civic organization, and major accomplishments";
    activity.querySelector(".li-section-header")?.insertAdjacentElement("afterend", label);
  }

  function refresh() {
    personalizeFacebookIntro();
    installFacebookPosts();
    reinforceLinkedInProfessionalIdentity();
  }

  function initialize() {
    injectStyles();
    refresh();
    [100, 400, 900, 1600].forEach((delay) => setTimeout(refresh, delay));
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
    window.addEventListener("hashchange", () => setTimeout(refresh, 80));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
