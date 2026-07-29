"use client";

import { useMemo, useState } from "react";

type Platform = "facebook" | "linkedin";
type FacebookTab = "Posts" | "About" | "Friends" | "Photos";

type Comment = {
  name: string;
  initials: string;
  text: string;
  tone?: "supportive" | "curious" | "critical";
};

type Post = {
  id: number;
  date: string;
  place: string;
  caption: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  basis: string;
  sourceLabel: string;
  sourceUrl: string;
  reactions: number;
  shares: number;
  comments: Comment[];
};

const posts: Post[] = [
  {
    id: 1,
    date: "29 March 1887",
    place: "Berlin, German Empire",
    caption:
      "At last, the pages I carried from Madrid to Paris and Germany are in print. I wrote Noli Me Tangere so that my countrymen might see our society as though before a mirror. May truth begin the work that silence could not.",
    image: "/images/noli-me-tangere.jpg",
    imageAlt: "Historic cover of Noli Me Tangere",
    imageCaption: "Noli Me Tangere · Berlin edition, 1887",
    basis:
      "Creative reconstruction based on Rizal completing and publishing Noli Me Tangere in Berlin in March 1887. Máximo Viola lent him the funds needed to print the first edition.",
    sourceLabel: "National Library of the Philippines",
    sourceUrl: "https://web.nlp.gov.ph/noli-berlin-ed/",
    reactions: 1287,
    shares: 214,
    comments: [
      {
        name: "Máximo Viola",
        initials: "MV",
        text: "Your labor has reached the press, Pepe. May every copy find a courageous reader.",
        tone: "supportive",
      },
      {
        name: "Ferdinand Blumentritt",
        initials: "FB",
        text: "I await the book with great interest. Its honest purpose deserves a careful reading.",
        tone: "supportive",
      },
      {
        name: "A Spanish colonial censor",
        initials: "SC",
        text: "The authorities will examine this publication and its accusations closely.",
        tone: "critical",
      },
    ],
  },
  {
    id: 2,
    date: "24 May 1888",
    place: "London, United Kingdom",
    caption:
      "I have arrived in London to study Antonio de Morga’s old account of the islands. Our people possessed laws, trade, learning, and culture before Spain. Recovering that memory is also a way of recovering dignity.",
    image: "/images/ilustrados-1890.jpg",
    imageAlt: "Group portrait of Filipino ilustrados around 1890",
    imageCaption: "Filipino ilustrados in Europe · c. 1890",
    basis:
      "Creative reconstruction based on Rizal’s stay in London from 1888 to 1889, where he researched at the British Museum and prepared his annotated edition of Antonio de Morga’s Sucesos de las Islas Filipinas.",
    sourceLabel: "Library of Congress country study",
    sourceUrl:
      "https://tile.loc.gov/storage-services/master/frd/frdcstdy/ph/philippinescount00dola_0/philippinescount00dola_0.pdf",
    reactions: 864,
    shares: 97,
    comments: [
      {
        name: "Mariano Ponce",
        initials: "MP",
        text: "A nation must know the chapters written before conquest. Continue the work.",
        tone: "supportive",
      },
      {
        name: "Antonio Luna",
        initials: "AL",
        text: "What evidence have you found about their science and trade? I am eager to compare notes.",
        tone: "curious",
      },
      {
        name: "Marcelo H. del Pilar",
        initials: "MD",
        text: "History, read critically, is another instrument of reform.",
        tone: "supportive",
      },
    ],
  },
  {
    id: 3,
    date: "18 September 1891",
    place: "Ghent, Belgium",
    caption:
      "El Filibusterismo has come off the press. I dedicate this work to the memory of Fathers Gómez, Burgos, and Zamora. It is a darker book than the Noli because the illness it describes has deepened—but I still write for the future of the Philippines.",
    image: "/images/el-filibusterismo-manuscript.jpg",
    imageAlt: "First manuscript page of El Filibusterismo",
    imageCaption: "First manuscript page of El Filibusterismo",
    basis:
      "Creative reconstruction based on the publication of El Filibusterismo in Ghent in 1891. The novel was dedicated to GOMBURZA, and Valentin Ventura provided financial assistance when printing funds ran short.",
    sourceLabel: "NHCP biographical marker",
    sourceUrl:
      "https://philhistoricsites.nhcp.gov.ph/registry_database/jose-protacio-rizal-1861-1896/",
    reactions: 1564,
    shares: 302,
    comments: [
      {
        name: "Valentin Ventura",
        initials: "VV",
        text: "It was an honor to help the book reach completion. May it reach the people for whom it was written.",
        tone: "supportive",
      },
      {
        name: "Graciano López Jaena",
        initials: "GL",
        text: "A stern mirror this time, compañero. Spain must not pretend it sees nothing.",
        tone: "supportive",
      },
      {
        name: "Ferdinand Blumentritt",
        initials: "FB",
        text: "Its warning is grave. I hope wisdom answers before violence does.",
        tone: "curious",
      },
    ],
  },
  {
    id: 4,
    date: "3 July 1892",
    place: "Tondo, Manila",
    caption:
      "Tonight we founded La Liga Filipina. Its work is peaceful and practical: unite the archipelago, defend people against injustice, encourage education, agriculture, and commerce, and help one another in every need. Reform must become organized service.",
    basis:
      "Creative reconstruction based on Rizal founding La Liga Filipina in Tondo on 3 July 1892. The aims summarized here follow the text of the NHCP historical marker.",
    sourceLabel: "NHCP La Liga Filipina marker",
    sourceUrl:
      "https://philhistoricsites.nhcp.gov.ph/registry_database/la-liga-filipina/",
    reactions: 2016,
    shares: 511,
    comments: [
      {
        name: "Domingo Franco",
        initials: "DF",
        text: "Unity must now be expressed through steady work. I stand with the Liga.",
        tone: "supportive",
      },
      {
        name: "Andrés Bonifacio",
        initials: "AB",
        text: "How shall ordinary workers take part and make the union strong in every district?",
        tone: "curious",
      },
      {
        name: "A Spanish colonial official",
        initials: "SO",
        text: "This association and its founder are under observation.",
        tone: "critical",
      },
    ],
  },
  {
    id: 5,
    date: "19 June 1895",
    place: "Talisay, Dapitan",
    caption:
      "Another year of life, spent usefully in Dapitan. Today there are patients to see, pupils to teach, trees to plant, and improvements to finish. Exile limits one’s movement, but it need not limit one’s service.",
    image: "/images/rizal-shrine-dapitan.jpg",
    imageAlt: "Replica of Rizal's residence at the Dapitan shrine",
    imageCaption: "Talisay estate, Dapitan · present-day reconstruction",
    basis:
      "Creative reconstruction based on Rizal’s 1892–1896 exile in Dapitan, where he practiced medicine, taught students, farmed, and helped develop a water-supply system. The date uses his 34th birthday as a plausible posting occasion.",
    sourceLabel: "Wikimedia Commons historical-site record",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rizal_Shrine,_Dapitan_City_(Features_and_Structures)_02.JPG",
    reactions: 1731,
    shares: 188,
    comments: [
      {
        name: "Paciano Rizal",
        initials: "PR",
        text: "Your family thinks of you today. Even in exile, your work continues to honor Calamba.",
        tone: "supportive",
      },
      {
        name: "José Aseniero",
        initials: "JA",
        text: "Maestro, shall we continue the surveying lesson after the garden work?",
        tone: "curious",
      },
      {
        name: "Josephine Bracken",
        initials: "JB",
        text: "The quiet work done here has already changed many lives.",
        tone: "supportive",
      },
    ],
  },
];

const people = [
  { name: "Paciano Rizal", role: "Brother and trusted confidant", initials: "PR" },
  { name: "Ferdinand Blumentritt", role: "Scholar and correspondent", initials: "FB" },
  { name: "Marcelo H. del Pilar", role: "Reformist and editor", initials: "MD" },
  { name: "Mariano Ponce", role: "Writer and reformist", initials: "MP" },
  { name: "Graciano López Jaena", role: "Writer and orator", initials: "GL" },
  { name: "Máximo Viola", role: "Physician and friend", initials: "MV" },
];

const sources = [
  {
    label: "NHCP · José Rizal biographical marker",
    url: "https://philhistoricsites.nhcp.gov.ph/registry_database/jose-protacio-rizal-1861-1896/",
  },
  {
    label: "NHCP · La Liga Filipina historical marker",
    url: "https://philhistoricsites.nhcp.gov.ph/registry_database/la-liga-filipina/",
  },
  {
    label: "National Library · The Making of Noli Me Tangere",
    url: "https://web.nlp.gov.ph/noli-berlin-ed/",
  },
  {
    label: "Library of Congress · Philippines: A Country Study",
    url: "https://tile.loc.gov/storage-services/master/frd/frdcstdy/ph/philippinescount00dola_0/philippinescount00dola_0.pdf",
  },
  {
    label: "Philippine Embassy in Berlin · Rizal in Germany",
    url: "https://philippine-embassy.de/2017/07/06/retracing-rizals-journey-through-germany/",
  },
  {
    label: "American Academy of Ophthalmology · José Rizal, MD",
    url: "https://www.aao.org/biographies-detail/jose-rizal-md",
  },
  {
    label: "Ateneo archival study · Rizal’s Record at the Ateneo",
    url: "https://archium.ateneo.edu/cgi/viewcontent.cgi?article=3965&context=phstudies",
  },
  {
    label: "University of Santo Tomas · University history",
    url: "https://www.ust.edu.ph/university-history/",
  },
];

const imageCredits = [
  {
    label: "José Rizal formal portrait, c. 1890s · public domain",
    url: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_full.jpg",
  },
  {
    label: "Dr. José Rizal portrait, 1896 · public domain",
    url: "https://commons.wikimedia.org/wiki/File:Dr_Jose_Rizal.jpg",
  },
  {
    label: "Filipino ilustrados, c. 1890 · public domain",
    url: "https://commons.wikimedia.org/wiki/File:Ilustrados_1890.jpg",
  },
  {
    label: "Noli Me Tangere cover, c. 1887 · public domain",
    url: "https://commons.wikimedia.org/wiki/File:Noli_Me_Tangere.jpg",
  },
  {
    label: "El Filibusterismo manuscript page · public domain",
    url: "https://commons.wikimedia.org/wiki/File:First_page_of_El_filibusterismo_manuscript.jpg",
  },
  {
    label: "Rizal Shrine, Dapitan · Iamjepoi, CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Rizal_Shrine,_Dapitan_City_(Features_and_Structures)_02.JPG",
  },
];

function Icon({
  name,
  size = 20,
}: {
  name:
    | "search"
    | "home"
    | "people"
    | "briefcase"
    | "message"
    | "bell"
    | "grid"
    | "camera"
    | "edit"
    | "more"
    | "like"
    | "comment"
    | "share"
    | "globe"
    | "location"
    | "school"
    | "book"
    | "eye"
    | "info"
    | "close"
    | "chevron";
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3Z" /><circle cx="12" cy="13" r="4" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    like: <><path d="M7 10v11H3V10h4Z" /><path d="M7 20h10a3 3 0 0 0 3-2.4l1-5A3 3 0 0 0 18 9h-4l1-4a2.5 2.5 0 0 0-4.7-1.7L7 10" /></>,
    comment: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></>,
    share: <><path d="m15 8 5-5 1 1-5 5" /><path d="M20 3v6h-6" /><path d="M10 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    school: <><path d="m3 10 9-6 9 6-9 6-9-6Z" /><path d="M7 13v5c3 2 7 2 10 0v-5M21 10v6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" /><path d="M8 7h8M8 11h8" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Avatar({
  initials,
  className = "",
  image,
}: {
  initials?: string;
  className?: string;
  image?: string;
}) {
  if (image) {
    return <img className={`avatar ${className}`} src={image} alt="José Rizal" />;
  }
  return <span className={`avatar initials ${className}`}>{initials}</span>;
}

function AppSwitcher({
  platform,
  onChange,
}: {
  platform: Platform;
  onChange: (platform: Platform) => void;
}) {
  return (
    <div className="project-switcher" aria-label="Choose social profile">
      <span className="switcher-label">Rizal Social Profiles</span>
      <button
        className={platform === "facebook" ? "active fb-choice" : "fb-choice"}
        onClick={() => onChange("facebook")}
        aria-pressed={platform === "facebook"}
      >
        <span className="mini-brand facebook-mark">f</span>
        Personal
      </button>
      <button
        className={platform === "linkedin" ? "active in-choice" : "in-choice"}
        onClick={() => onChange("linkedin")}
        aria-pressed={platform === "linkedin"}
      >
        <span className="mini-brand linkedin-mark">in</span>
        Professional
      </button>
    </div>
  );
}

function HistoricalNote({ post }: { post: Post }) {
  return (
    <details className="historical-note">
      <summary>
        <Icon name="info" size={16} />
        Historical basis
      </summary>
      <p>{post.basis}</p>
      <a href={post.sourceUrl} target="_blank" rel="noreferrer">
        Check source: {post.sourceLabel}
      </a>
    </details>
  );
}

function FacebookPost({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(true);

  return (
    <article className="fb-card fb-post">
      <header className="post-header">
        <Avatar image="/images/jose-rizal-personal.jpg" className="post-avatar" />
        <div>
          <h3>José Rizal</h3>
          <p>
            {post.date} · {post.place} · <Icon name="globe" size={12} />
          </p>
        </div>
        <button className="icon-button post-more" aria-label="Post options">
          <Icon name="more" />
        </button>
      </header>

      <p className="post-caption">{post.caption}</p>
      <HistoricalNote post={post} />

      {post.image && (
        <figure className={`post-media ${post.id === 1 || post.id === 3 ? "book-media" : ""}`}>
          <img src={post.image} alt={post.imageAlt} />
          <figcaption>{post.imageCaption}</figcaption>
        </figure>
      )}

      <div className="post-stats">
        <span>
          <span className="reaction-bubble">👍</span>
          <span className="reaction-heart">♥</span>
          {(post.reactions + (liked ? 1 : 0)).toLocaleString()}
        </span>
        <button onClick={() => setCommentsOpen((open) => !open)}>
          {post.comments.length} comments
        </button>
        <span>{post.shares} shares</span>
      </div>

      <div className="post-actions">
        <button className={liked ? "liked" : ""} onClick={() => setLiked((value) => !value)}>
          <Icon name="like" size={19} />
          Like
        </button>
        <button onClick={() => setCommentsOpen(true)}>
          <Icon name="comment" size={19} />
          Comment
        </button>
        <button>
          <Icon name="share" size={19} />
          Share
        </button>
      </div>

      {commentsOpen && (
        <div className="comments">
          {post.comments.map((comment) => (
            <div className="comment" key={comment.name}>
              <Avatar initials={comment.initials} className={`comment-avatar ${comment.tone ?? ""}`} />
              <div>
                <div className="comment-bubble">
                  <strong>{comment.name}</strong>
                  <p>{comment.text}</p>
                </div>
                <div className="comment-meta">
                  <button>Like</button>
                  <button>Reply</button>
                  <span>Creative reconstruction</span>
                </div>
              </div>
            </div>
          ))}
          <div className="comment-compose">
            <Avatar image="/images/jose-rizal-personal.jpg" className="comment-avatar" />
            <span>Write a comment…</span>
          </div>
        </div>
      )}
    </article>
  );
}

function FacebookHeader() {
  return (
    <header className="fb-topbar">
      <div className="fb-left">
        <span className="facebook-logo">f</span>
        <label className="fb-search">
          <Icon name="search" size={18} />
          <input aria-label="Search Facebook" placeholder="Search Facebook" readOnly />
        </label>
      </div>
      <nav className="fb-main-nav" aria-label="Facebook navigation">
        <button className="selected" aria-label="Home"><Icon name="home" size={27} /></button>
        <button aria-label="Friends"><Icon name="people" size={27} /></button>
        <button aria-label="Watch"><Icon name="eye" size={27} /></button>
        <button aria-label="Marketplace"><Icon name="briefcase" size={27} /></button>
        <button aria-label="Groups"><span className="round-group">◉</span></button>
      </nav>
      <div className="fb-actions">
        <button className="top-round" aria-label="Menu"><Icon name="grid" /></button>
        <button className="top-round" aria-label="Messenger"><Icon name="message" /></button>
        <button className="top-round has-badge" aria-label="Notifications">
          <Icon name="bell" /><span>3</span>
        </button>
        <Avatar image="/images/jose-rizal-personal.jpg" className="top-avatar" />
      </div>
    </header>
  );
}

function FacebookHero({
  activeTab,
  onTabChange,
}: {
  activeTab: FacebookTab;
  onTabChange: (tab: FacebookTab) => void;
}) {
  return (
    <section className="fb-profile-shell">
      <div className="fb-cover">
        <img src="/images/ilustrados-1890.jpg" alt="Filipino ilustrados in Europe around 1890" />
        <span>Filipino ilustrados in Europe · c. 1890</span>
        <button><Icon name="camera" size={18} /> Edit cover photo</button>
      </div>
      <div className="fb-profile-info">
        <div className="fb-identity">
          <div className="fb-profile-picture-wrap">
            <Avatar image="/images/jose-rizal-personal.jpg" className="fb-profile-picture" />
            <button aria-label="Change profile photo"><Icon name="camera" size={18} /></button>
          </div>
          <div className="fb-name">
            <h1>José Rizal <span title="Educational verified profile">✓</span></h1>
            <p>2.4K friends <em>· simulated for the activity</em></p>
            <div className="friend-stack" aria-label="Close friends">
              {people.slice(0, 6).map((person) => <Avatar key={person.name} initials={person.initials} />)}
            </div>
          </div>
        </div>
        <div className="fb-profile-actions">
          <button className="primary"><span>＋</span> Add to story</button>
          <button><Icon name="edit" size={17} /> Edit profile</button>
          <button className="square">⌄</button>
        </div>
      </div>
      <div className="fb-profile-tabs">
        <nav>
          {(["Posts", "About", "Friends", "Photos"] as FacebookTab[]).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
          <button>More ▾</button>
        </nav>
        <button className="tab-more" aria-label="More profile options"><Icon name="more" /></button>
      </div>
    </section>
  );
}

function PhotoChoiceCard({ kind }: { kind: "personal" | "professional" }) {
  const personal = kind === "personal";
  return (
    <section className={personal ? "fb-card photo-choice-card" : "linkedin-card photo-choice-card linkedin-photo-note"}>
      <div className="section-title-row">
        <h2>Why this profile photo?</h2>
        <Icon name="camera" size={20} />
      </div>
      <div className="photo-choice-content">
        <img
          src={personal ? "/images/jose-rizal-personal.jpg" : "/images/jose-rizal-portrait.jpg"}
          alt={personal ? "Warm-toned 1896 portrait of José Rizal" : "Formal portrait of José Rizal"}
        />
        <p>
          {personal
            ? "For the personal account, I chose the softer, warm-toned 1896 portrait. Rizal still wears period formal clothing, but the gentler framing feels more personal and approachable—suited to posts about friends, travel, study, and daily service."
            : "For the professional account, I chose the sharper formal portrait from the 1890s. His dark European suit, composed expression, and direct gaze present the serious physician, scholar, and author expected in a professional profile."}
        </p>
      </div>
    </section>
  );
}

function FacebookIntro() {
  return (
    <aside className="facebook-left-column">
      <section className="fb-card intro-card">
        <h2>Intro</h2>
        <p className="fb-bio">Physician, writer, student of nations, and a Filipino devoted to peaceful reform.</p>
        <button>Edit bio</button>
        <ul>
          <li><Icon name="briefcase" size={20} /> Works as <strong>Physician &amp; Educator</strong></li>
          <li><Icon name="book" size={20} /> Author of <strong>Noli Me Tangere</strong> and <strong>El Filibusterismo</strong></li>
          <li><Icon name="school" size={20} /> Studied at <strong>Universidad Central de Madrid</strong></li>
          <li><Icon name="home" size={20} /> From <strong>Calamba, Laguna</strong></li>
          <li><Icon name="location" size={20} /> Lives in <strong>Dapitan</strong></li>
          <li><Icon name="globe" size={20} /> Followed by readers across Europe and Las Islas Filipinas</li>
        </ul>
        <button>Edit details</button>
        <div className="hobby-chips">
          <span>✒ Writing</span><span>♞ Fencing</span><span>✎ Sketching</span><span>🌿 Botany</span>
        </div>
        <button>Edit hobbies</button>
      </section>

      <PhotoChoiceCard kind="personal" />

      <section className="fb-card photos-card">
        <div className="section-title-row">
          <h2>Photos</h2>
          <button>See all photos</button>
        </div>
        <div className="mini-photo-grid">
          <img src="/images/noli-me-tangere.jpg" alt="Noli Me Tangere cover" />
          <img src="/images/el-filibusterismo-manuscript.jpg" alt="El Filibusterismo manuscript" />
          <img src="/images/rizal-shrine-dapitan.jpg" alt="Rizal shrine in Dapitan" />
          <img src="/images/ilustrados-1890.jpg" alt="Filipino ilustrados" />
        </div>
      </section>

      <section className="fb-card friends-card">
        <div className="section-title-row">
          <div><h2>Friends</h2><p>Historical contemporaries</p></div>
          <button>See all friends</button>
        </div>
        <div className="friend-grid">
          {people.map((person) => (
            <div key={person.name}>
              <Avatar initials={person.initials} />
              <strong>{person.name}</strong>
            </div>
          ))}
        </div>
      </section>
      <p className="left-footer">Privacy · Terms · Advertising · Educational concept · © 1896 (imagined)</p>
    </aside>
  );
}

function FacebookComposer() {
  return (
    <>
      <section className="fb-card composer">
        <div>
          <Avatar image="/images/jose-rizal-personal.jpg" className="composer-avatar" />
          <button>What&apos;s on your mind?</button>
        </div>
        <div className="composer-actions">
          <button><span className="video-dot">●</span> Live video</button>
          <button><span>▧</span> Photo/video</button>
          <button><span>⚑</span> Life event</button>
        </div>
      </section>
      <section className="fb-card posts-filter">
        <h2>Posts</h2>
        <div><button>☷ Filters</button><button>⚙ Manage posts</button></div>
        <nav><button className="active">▤ List view</button><button>▦ Grid view</button></nav>
      </section>
    </>
  );
}

function AboutPanel() {
  return (
    <div className="fb-wide-panel">
      <section className="fb-card about-layout">
        <aside>
          <h2>About</h2>
          <button className="active">Overview</button>
          <button>Work and education</button>
          <button>Places lived</button>
          <button>Contact and basic info</button>
          <button>Family and relationships</button>
          <button>Life events</button>
        </aside>
        <div className="about-details">
          <h3>Overview</h3>
          <p><Icon name="briefcase" /> Physician, author, educator, reform advocate</p>
          <p><Icon name="school" /> Studied Medicine and Philosophy &amp; Letters at Universidad Central de Madrid</p>
          <p><Icon name="home" /> Born 19 June 1861 in Calamba, Laguna</p>
          <p><Icon name="location" /> Lived in Manila, Madrid, Paris, Heidelberg, Berlin, London, Hong Kong, and Dapitan</p>
          <p><Icon name="book" /> Published Noli Me Tangere (1887) and El Filibusterismo (1891)</p>
          <div className="fact-box">
            These are verified biographical facts. The social interface, friend count, reactions, and first-person social captions are creative reconstructions for the class activity.
          </div>
        </div>
      </section>
    </div>
  );
}

function FriendsPanel() {
  return (
    <div className="fb-wide-panel">
      <section className="fb-card friends-panel">
        <div className="section-title-row"><h2>Friends</h2><label><Icon name="search" /><input placeholder="Search friends" readOnly /></label></div>
        <nav><button className="active">All friends</button><button>Recently added</button><button>Birthdays</button><button>Following</button></nav>
        <div className="large-friend-grid">
          {people.map((person) => (
            <article key={person.name}>
              <Avatar initials={person.initials} />
              <div><strong>{person.name}</strong><p>{person.role}</p></div>
              <button aria-label={`Options for ${person.name}`}><Icon name="more" /></button>
            </article>
          ))}
        </div>
        <p className="reconstruction-label">The people are historical; friendship labels and interface relationships are reconstructed.</p>
      </section>
    </div>
  );
}

function PhotosPanel() {
  const photos = [
    { src: "/images/jose-rizal-personal.jpg", label: "Personal portrait · 1896" },
    { src: "/images/jose-rizal-portrait.jpg", label: "Formal portrait · c. 1890s" },
    { src: "/images/ilustrados-1890.jpg", label: "Ilustrados in Europe · c. 1890" },
    { src: "/images/noli-me-tangere.jpg", label: "Noli Me Tangere · 1887" },
    { src: "/images/el-filibusterismo-manuscript.jpg", label: "El Filibusterismo manuscript" },
    { src: "/images/rizal-shrine-dapitan.jpg", label: "Talisay, Dapitan" },
  ];
  return (
    <div className="fb-wide-panel">
      <section className="fb-card photos-panel">
        <div className="section-title-row"><h2>Photos</h2><button>Add photos/video</button></div>
        <nav><button className="active">Photos of you</button><button>Your photos</button><button>Albums</button></nav>
        <div className="large-photo-grid">
          {photos.map((photo) => <figure key={photo.label}><img src={photo.src} alt={photo.label} /><figcaption>{photo.label}</figcaption></figure>)}
        </div>
      </section>
    </div>
  );
}

function FacebookProfile({ onOpenSources }: { onOpenSources: () => void }) {
  const [activeTab, setActiveTab] = useState<FacebookTab>("Posts");
  return (
    <div className="facebook-app">
      <FacebookHeader />
      <div className="context-ribbon">
        <span>Educational reconstruction · Profile view only</span>
        <button onClick={onOpenSources}>Facts &amp; image credits</button>
      </div>
      <FacebookHero activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "Posts" && (
        <main className="facebook-content">
          <FacebookIntro />
          <div className="facebook-feed">
            <FacebookComposer />
            {posts.map((post) => <FacebookPost key={post.id} post={post} />)}
          </div>
        </main>
      )}
      {activeTab === "About" && <AboutPanel />}
      {activeTab === "Friends" && <FriendsPanel />}
      {activeTab === "Photos" && <PhotosPanel />}
    </div>
  );
}

function LinkedInHeader() {
  const navItems = [
    { icon: "home" as const, label: "Home" },
    { icon: "people" as const, label: "My Network" },
    { icon: "briefcase" as const, label: "Jobs" },
    { icon: "message" as const, label: "Messaging" },
    { icon: "bell" as const, label: "Notifications", badge: "2" },
  ];
  return (
    <header className="linkedin-topbar">
      <div className="linkedin-topbar-inner">
        <span className="linkedin-logo">in</span>
        <label className="linkedin-search"><Icon name="search" size={17} /><input placeholder="Search" readOnly /></label>
        <nav>
          {navItems.map((item, index) => (
            <button className={index === 0 ? "active" : ""} key={item.label}>
              <span className="li-icon-wrap"><Icon name={item.icon} size={22} />{item.badge && <em>{item.badge}</em>}</span>
              {item.label}
            </button>
          ))}
          <button><Avatar image="/images/jose-rizal-portrait.jpg" className="li-me-avatar" />Me ▾</button>
          <button className="work-menu"><Icon name="grid" size={21} />For Work ▾</button>
          <a href="#sources">View historical sources</a>
        </nav>
      </div>
    </header>
  );
}

function LinkedInProfileCard() {
  return (
    <section className="linkedin-card linkedin-profile-card">
      <div className="li-cover">
        <img src="/images/ilustrados-1890.jpg" alt="Filipino ilustrados in Europe around 1890" />
        <div className="li-cover-overlay" />
        <button aria-label="Edit background photo"><Icon name="camera" size={18} /></button>
      </div>
      <div className="li-profile-body">
        <Avatar image="/images/jose-rizal-portrait.jpg" className="li-profile-photo" />
        <button className="li-edit"><Icon name="edit" /></button>
        <div className="li-profile-grid">
          <div>
            <h1>José Rizal <span>· 1st</span></h1>
            <p className="li-headline">Ophthalmologist · Novelist · Educator · Advocate for peaceful reform</p>
            <p className="li-location">Dapitan, Mindanao, Las Islas Filipinas · <button>Contact info</button></p>
            <button className="li-connections">347 connections <em>· simulated</em></button>
            <div className="li-profile-actions">
              <button className="li-primary">Open to</button>
              <button className="li-outline">Add profile section</button>
              <button className="li-outline gray">More</button>
            </div>
          </div>
          <div className="li-affiliations">
            <div><span className="institution-badge madrid">U</span><strong>Universidad Central de Madrid</strong></div>
            <div><span className="institution-badge liga">L</span><strong>La Liga Filipina</strong></div>
          </div>
        </div>
      </div>
      <div className="li-open-card">
        <button className="li-edit"><Icon name="edit" size={17} /></button>
        <strong>Providing services</strong>
        <p>Ophthalmology, community medicine, teaching, writing, translation</p>
        <button>Show details</button>
      </div>
    </section>
  );
}

function LinkedInSection({
  title,
  children,
  subtitle,
}: {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="linkedin-card linkedin-section">
      <div className="li-section-header">
        <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
        <button aria-label={`Edit ${title}`}><Icon name="edit" size={20} /></button>
      </div>
      {children}
    </section>
  );
}

function ExperienceItem({
  badge,
  title,
  company,
  dates,
  location,
  description,
}: {
  badge: string;
  title: string;
  company: string;
  dates: string;
  location: string;
  description: string;
}) {
  return (
    <article className="experience-item">
      <span className="experience-badge">{badge}</span>
      <div>
        <h3>{title}</h3>
        <p>{company}</p>
        <span>{dates}</span>
        <span>{location}</span>
        <p className="experience-description">{description}</p>
      </div>
    </article>
  );
}

function LinkedInMain() {
  return (
    <div className="linkedin-main-column">
      <LinkedInProfileCard />
      <PhotoChoiceCard kind="professional" />

      <LinkedInSection title="About">
        <p className="li-about">
          I am a Filipino physician and writer committed to education, historical study, human dignity, and peaceful reform. My medical work centers on diseases of the eye; my written work examines the social conditions of the Philippines. In Dapitan, I combine clinical practice with teaching, agriculture, scientific observation, and community improvement.
        </p>
        <p className="reconstruction-label">First-person summary is creatively written from verified roles and activities; it is not a historical quotation.</p>
      </LinkedInSection>

      <LinkedInSection title="Activity" subtitle="2,846 followers · simulated for the activity">
        <nav className="activity-pills"><button className="active">Posts</button><button>Comments</button><button>Images</button></nav>
        <div className="li-activity-grid">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id}>
              <div className="li-activity-author"><Avatar image="/images/jose-rizal-portrait.jpg" /><span><strong>José Rizal</strong> posted this · {post.date}</span></div>
              <p>{post.caption}</p>
              <span>Historical basis available in the personal profile</span>
            </article>
          ))}
        </div>
        <button className="show-all">Show all posts <span>→</span></button>
      </LinkedInSection>

      <LinkedInSection title="Experience">
        <ExperienceItem
          badge="DR"
          title="Physician, Educator & Community Builder"
          company="Independent practice"
          dates="July 1892 – July 1896 · 4 yrs"
          location="Dapitan, Mindanao"
          description="Practiced medicine, operated an informal school for boys, pursued farming and natural-history studies, and helped improve the community water supply while in exile."
        />
        <ExperienceItem
          badge="LS"
          title="Contributor"
          company="La Solidaridad"
          dates="1889 – 1890"
          location="Spain · Correspondence"
          description="Wrote essays advocating representation, civil liberties, education, equality before the law, and reform of colonial administration."
        />
        <ExperienceItem
          badge="JR"
          title="Novelist, Essayist & Historical Researcher"
          company="Independent"
          dates="1884 – 1891"
          location="Madrid · Paris · Heidelberg · Berlin · London · Ghent"
          description="Published Noli Me Tangere and El Filibusterismo; researched and annotated Antonio de Morga’s Sucesos de las Islas Filipinas."
        />
      </LinkedInSection>

      <LinkedInSection title="Education">
        <ExperienceItem
          badge="UM"
          title="Universidad Central de Madrid"
          company="Licentiate in Medicine; Philosophy and Letters"
          dates="1882 – 1885"
          location="Madrid, Spain"
          description="Completed his medical studies and earned a licentiate in Philosophy and Letters; later pursued advanced ophthalmic training in Paris and Heidelberg."
        />
        <ExperienceItem
          badge="UST"
          title="University of Santo Tomas"
          company="Medicine; earlier studies in Philosophy and Letters"
          dates="1877 – 1882"
          location="Manila"
          description="Began tertiary studies in Philosophy and Letters, then studied medicine before continuing his education in Madrid."
        />
        <ExperienceItem
          badge="AM"
          title="Ateneo Municipal de Manila"
          company="Bachelor of Arts"
          dates="1872 – 1877"
          location="Manila"
          description="Completed the bachillerato with strong academic distinction and also trained in surveying."
        />
      </LinkedInSection>

      <LinkedInSection title="Publications">
        <div className="publication-list">
          <article><img src="/images/noli-me-tangere.jpg" alt="" /><div><h3>Noli Me Tangere</h3><p>Berlin · 1887</p><span>A social novel exposing abuses and inequities under Spanish colonial rule.</span></div></article>
          <article><img src="/images/el-filibusterismo-manuscript.jpg" alt="" /><div><h3>El Filibusterismo</h3><p>Ghent · 1891</p><span>A darker sequel dedicated to the memory of GOMBURZA.</span></div></article>
          <article><span className="publication-placeholder">S</span><div><h3>Sucesos de las Islas Filipinas — annotated edition</h3><p>Paris · 1890</p><span>Rizal’s annotations challenged colonial accounts and highlighted precolonial Filipino society.</span></div></article>
        </div>
      </LinkedInSection>

      <LinkedInSection title="Skills">
        <div className="skill-list">
          {[
            ["Ophthalmology", "Endorsed by patients and medical colleagues"],
            ["Creative & Political Writing", "Demonstrated in two novels and numerous essays"],
            ["Education", "Applied through the school he operated in Dapitan"],
            ["Historical Research", "Applied in his annotated edition of Morga"],
            ["Languages & Translation", "Used across scholarship and international correspondence"],
          ].map(([skill, detail]) => <article key={skill}><strong>{skill}</strong><p>{detail}</p><span>✓ Historical skill · endorsement text is explanatory</span></article>)}
        </div>
      </LinkedInSection>
    </div>
  );
}

function LinkedInAside({ onOpenSources }: { onOpenSources: () => void }) {
  return (
    <aside className="linkedin-aside">
      <section className="linkedin-card li-side-card settings-card">
        <div><strong>Profile language</strong><button><Icon name="edit" size={18} /></button></div>
        <p>English · Spanish</p>
        <hr />
        <div><strong>Public profile &amp; URL</strong><button><Icon name="edit" size={18} /></button></div>
        <p>linkedin.com/in/jose-rizal-1861</p>
      </section>
      <section className="linkedin-card li-side-card">
        <h2>People also viewed</h2>
        {people.slice(0, 4).map((person) => (
          <article className="li-person" key={person.name}>
            <Avatar initials={person.initials} />
            <div><strong>{person.name}</strong><p>{person.role}</p><button>＋ Connect</button></div>
          </article>
        ))}
        <button className="show-all side-show">Show all</button>
      </section>
      <section id="sources" className="linkedin-card li-side-card source-side">
        <Icon name="info" size={24} />
        <h2>Fact-checked concept</h2>
        <p>Historical dates and roles are sourced. Social counts, interface actions, captions, and comments are creative reconstructions.</p>
        <button onClick={onOpenSources}>View sources &amp; image credits</button>
      </section>
      <footer>About · Accessibility · Help Center · Privacy &amp; Terms · Educational concept<br /><strong><span>Linked</span>in</strong> © 1896 (imagined)</footer>
    </aside>
  );
}

function LinkedInProfile({ onOpenSources }: { onOpenSources: () => void }) {
  return (
    <div className="linkedin-app">
      <LinkedInHeader />
      <div className="linkedin-context">
        Educational reconstruction · Own-profile view · No sign-in or personal data collection
      </div>
      <main className="linkedin-layout">
        <LinkedInMain />
        <LinkedInAside onOpenSources={onOpenSources} />
      </main>
    </div>
  );
}

function SourcesModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="sources-modal" role="dialog" aria-modal="true" aria-labelledby="sources-title" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div><p>Research notes</p><h2 id="sources-title">Historical sources &amp; image credits</h2></div>
          <button onClick={onClose} aria-label="Close sources"><Icon name="close" /></button>
        </header>
        <div className="modal-body">
          <div className="source-principle">
            <Icon name="info" />
            <p><strong>What is factual?</strong> Dates, institutions, publications, places, roles, and documented activities. <strong>What is imagined?</strong> First-person captions, comments, reactions, connection counts, and interface actions. No imagined statement is presented as a real quotation.</p>
          </div>
          <h3>Historical references</h3>
          <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<Icon name="chevron" size={15} /></a></li>)}</ol>
          <h3>Image credits</h3>
          <ol>{imageCredits.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<Icon name="chevron" size={15} /></a></li>)}</ol>
          <p className="modal-disclaimer">Facebook and LinkedIn names and interface cues are used only to create a noncommercial educational mock profile. This project is not affiliated with or endorsed by Meta or LinkedIn.</p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("facebook");
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const title = useMemo(
    () => platform === "facebook" ? "José Rizal · Personal Profile" : "José Rizal · Professional Profile",
    [platform],
  );

  return (
    <>
      <a className="skip-link" href="#profile-content">Skip to profile content</a>
      <AppSwitcher platform={platform} onChange={setPlatform} />
      <div id="profile-content" aria-label={title}>
        {platform === "facebook"
          ? <FacebookProfile onOpenSources={() => setSourcesOpen(true)} />
          : <LinkedInProfile onOpenSources={() => setSourcesOpen(true)} />}
      </div>
      {sourcesOpen && <SourcesModal onClose={() => setSourcesOpen(false)} />}
    </>
  );
}
