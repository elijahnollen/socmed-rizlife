(() => {
  const languageGroups = [
    {
      title: "Primary and major working languages",
      detail: "Used extensively in writing, study, professional work, or correspondence",
      languages: ["Tagalog", "Spanish", "English", "French", "German"],
    },
    {
      title: "Philippine and regional languages",
      detail: "Spoken, studied, or used during his work in the Philippines and Southeast Asia",
      languages: ["Ilocano", "Bisayan (Cebuano)", "Subanun", "Malay"],
    },
    {
      title: "European languages studied or read",
      detail: "Used to different degrees for scholarship, reading, travel, and linguistic study",
      languages: ["Latin", "Greek", "Italian", "Dutch", "Catalan", "Portuguese", "Swedish", "Russian"],
    },
    {
      title: "Asian and Semitic languages studied or translated",
      detail: "Documented among the languages he studied, read, or used in translation",
      languages: ["Arabic", "Hebrew", "Sanskrit", "Chinese", "Japanese"],
    },
  ];

  const allLanguages = languageGroups.flatMap((group) => group.languages);

  function injectStyles() {
    if (document.getElementById("rizal-linkedin-language-styles")) return;

    const style = document.createElement("style");
    style.id = "rizal-linkedin-language-styles";
    style.textContent = `
      .rizal-profile-language-list {
        line-height: 1.55 !important;
        overflow-wrap: anywhere;
      }

      .linkedin-languages-section .li-section-header p {
        color: rgba(0, 0, 0, .58);
        font-size: 13px;
      }

      .rizal-language-groups {
        border-top: 1px solid #e0dfdc;
      }

      .rizal-language-group {
        padding: 18px 24px;
        border-bottom: 1px solid #e0dfdc;
      }

      .rizal-language-group:last-child {
        border-bottom: 0;
      }

      .rizal-language-group h3 {
        margin: 0;
        color: rgba(0, 0, 0, .9);
        font-size: 16px;
      }

      .rizal-language-group > p {
        margin: 3px 0 12px;
        color: rgba(0, 0, 0, .58);
        font-size: 13px;
        line-height: 1.4;
      }

      .rizal-language-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px 18px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .rizal-language-list li {
        display: flex;
        align-items: center;
        gap: 9px;
        min-height: 34px;
        color: rgba(0, 0, 0, .82);
        font-size: 14px;
        font-weight: 600;
      }

      .rizal-language-list li::before {
        content: "";
        width: 7px;
        height: 7px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: #0a66c2;
      }

      @media (max-width: 640px) {
        .rizal-language-group {
          padding: 16px;
        }

        .rizal-language-list {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.append(style);
  }

  function updateProfileLanguageCard() {
    const card = document.querySelector(".linkedin-app .settings-card");
    if (!card) return;

    const label = Array.from(card.querySelectorAll("strong")).find(
      (node) => node.textContent?.trim() === "Profile language",
    );
    const row = label?.closest("div");
    const paragraph = row?.nextElementSibling;
    if (!(paragraph instanceof HTMLElement)) return;

    paragraph.classList.add("rizal-profile-language-list");
    paragraph.textContent = allLanguages.join(" · ");
  }

  function createLanguagesSection() {
    const section = document.createElement("section");
    section.id = "rizal-linkedin-languages";
    section.className = "linkedin-card linkedin-section linkedin-languages-section";
    section.innerHTML = `
      <div class="li-section-header">
        <div>
          <h2>Languages</h2>
          <p>22 documented languages</p>
        </div>
        <button aria-label="Edit Languages">✎</button>
      </div>
      <div class="rizal-language-groups">
        ${languageGroups
          .map(
            (group) => `
              <article class="rizal-language-group">
                <h3>${group.title}</h3>
                <p>${group.detail}</p>
                <ul class="rizal-language-list">
                  ${group.languages.map((language) => `<li>${language}</li>`).join("")}
                </ul>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
    return section;
  }

  function addLanguagesSection() {
    if (document.getElementById("rizal-linkedin-languages")) return;

    const column = document.querySelector(".linkedin-app .linkedin-main-column");
    if (!column) return;

    const skillsSection = Array.from(column.querySelectorAll(":scope > .linkedin-section")).find(
      (section) => section.querySelector(".li-section-header h2")?.textContent?.trim() === "Skills",
    );

    const section = createLanguagesSection();
    if (skillsSection) column.insertBefore(section, skillsSection);
    else column.append(section);
  }

  function refresh() {
    updateProfileLanguageCard();
    addLanguagesSection();
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
