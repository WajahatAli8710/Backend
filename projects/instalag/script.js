/* ==================== DUMMY DATA ==================== */

const profileData = {
  username: "alex.travels",
  name: "Alex Morgan",
  bio: "Exploring the world one city at a time\nPhotographer | Storyteller | Coffee addict\nBased in San Francisco",
  website: "linktr.ee/alex.travels",
  category: "Travel & Adventure",
  avatar: "https://i.pravatar.cc/150?img=11",
  posts: 48,
  followers: 12400,
  following: 534,
};

const highlightsData = [
  { id: 1, label: "Japan", img: "https://picsum.photos/seed/h1/200" },
  { id: 2, label: "Italy", img: "https://picsum.photos/seed/h2/200" },
  { id: 3, label: "NYC", img: "https://picsum.photos/seed/h3/200" },
  { id: 4, label: "Food", img: "https://picsum.photos/seed/h4/200" },
  { id: 5, label: "Sunsets", img: "https://picsum.photos/seed/h5/200" },
  { id: 6, label: "Iceland", img: "https://picsum.photos/seed/h6/200" },
  { id: 7, label: "Bali", img: "https://picsum.photos/seed/h7/200" },
];

const postsData = [
  { id: 1, img: "https://picsum.photos/seed/p1/600", likes: 1243, comments: 42 },
  { id: 2, img: "https://picsum.photos/seed/p2/600", likes: 892, comments: 31 },
  { id: 3, img: "https://picsum.photos/seed/p3/600", likes: 2104, comments: 87 },
  { id: 4, img: "https://picsum.photos/seed/p4/600", likes: 567, comments: 18 },
  { id: 5, img: "https://picsum.photos/seed/p5/600", likes: 3421, comments: 124 },
  { id: 6, img: "https://picsum.photos/seed/p6/600", likes: 1876, comments: 63 },
  { id: 7, img: "https://picsum.photos/seed/p7/600", likes: 743, comments: 22 },
  { id: 8, img: "https://picsum.photos/seed/p8/600", likes: 1532, comments: 55 },
  { id: 9, img: "https://picsum.photos/seed/p9/600", likes: 2897, comments: 96 },
  { id: 10, img: "https://picsum.photos/seed/p10/600", likes: 456, comments: 14 },
  { id: 11, img: "https://picsum.photos/seed/p11/600", likes: 1120, comments: 37 },
  { id: 12, img: "https://picsum.photos/seed/p12/600", likes: 2340, comments: 78 },
  { id: 13, img: "https://picsum.photos/seed/p13/600", likes: 678, comments: 21 },
  { id: 14, img: "https://picsum.photos/seed/p14/600", likes: 1890, comments: 62 },
  { id: 15, img: "https://picsum.photos/seed/p15/600", likes: 3210, comments: 105 },
  { id: 16, img: "https://picsum.photos/seed/p16/600", likes: 942, comments: 28 },
  { id: 17, img: "https://picsum.photos/seed/p17/600", likes: 1567, comments: 48 },
  { id: 18, img: "https://picsum.photos/seed/p18/600", likes: 2678, comments: 89 },
];

const reelsData = [
  { id: 1, img: "https://picsum.photos/seed/r1/400/700", views: 12400 },
  { id: 2, img: "https://picsum.photos/seed/r2/400/700", views: 45200 },
  { id: 3, img: "https://picsum.photos/seed/r3/400/700", views: 8900 },
  { id: 4, img: "https://picsum.photos/seed/r4/400/700", views: 23100 },
  { id: 5, img: "https://picsum.photos/seed/r5/400/700", views: 67800 },
  { id: 6, img: "https://picsum.photos/seed/r6/400/700", views: 5400 },
];

const savedPostsData = [
  { id: 1, img: "https://picsum.photos/seed/sp1/600", likes: 4521, comments: 132 },
  { id: 2, img: "https://picsum.photos/seed/sp2/600", likes: 7832, comments: 245 },
  { id: 3, img: "https://picsum.photos/seed/sp3/600", likes: 1290, comments: 56 },
  { id: 4, img: "https://picsum.photos/seed/sp4/600", likes: 5673, comments: 187 },
  { id: 5, img: "https://picsum.photos/seed/sp5/600", likes: 3412, comments: 98 },
  { id: 6, img: "https://picsum.photos/seed/sp6/600", likes: 8910, comments: 312 },
  { id: 7, img: "https://picsum.photos/seed/sp7/600", likes: 2245, comments: 67 },
  { id: 8, img: "https://picsum.photos/seed/sp8/600", likes: 6789, comments: 201 },
  { id: 9, img: "https://picsum.photos/seed/sp9/600", likes: 1567, comments: 43 },
];

const savedReelsData = [
  { id: 1, img: "https://picsum.photos/seed/sr1/400/700", views: 98700 },
  { id: 2, img: "https://picsum.photos/seed/sr2/400/700", views: 234500 },
  { id: 3, img: "https://picsum.photos/seed/sr3/400/700", views: 45600 },
  { id: 4, img: "https://picsum.photos/seed/sr4/400/700", views: 12300 },
  { id: 5, img: "https://picsum.photos/seed/sr5/400/700", views: 78900 },
  { id: 6, img: "https://picsum.photos/seed/sr6/400/700", views: 156000 },
];

/* ==================== UTILITY FUNCTIONS ==================== */

function formatCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 10000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toLocaleString();
}

function animateCount(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = formatCount(Math.floor(start));
  }, 16);
}

/* ==================== RENDER FUNCTIONS ==================== */

function renderStats() {
  const postsEl = document.getElementById("postsCount");
  const followersEl = document.getElementById("followersCount");
  const followingEl = document.getElementById("followingCount");
  const postsElMobile = document.getElementById("postsCountMobile");
  const followersElMobile = document.getElementById("followersCountMobile");
  const followingElMobile = document.getElementById("followingCountMobile");

  animateCount(postsEl, profileData.posts, 600);
  animateCount(followersEl, profileData.followers, 800);
  animateCount(followingEl, profileData.following, 700);
  animateCount(postsElMobile, profileData.posts, 600);
  animateCount(followersElMobile, profileData.followers, 800);
  animateCount(followingElMobile, profileData.following, 700);
}

function renderHighlights() {
  const container = document.getElementById("highlights");

  const addHighlight = `
    <div class="highlight highlight--add">
      <div class="highlight-ring">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </div>
      <span class="highlight-label">New</span>
    </div>
  `;

  const highlights = highlightsData
    .map(
      (h) => `
    <div class="highlight" data-id="${h.id}">
      <div class="highlight-ring">
        <img src="${h.img}" alt="${h.label}" class="highlight-img" loading="lazy">
      </div>
      <span class="highlight-label">${h.label}</span>
    </div>
  `
    )
    .join("");

  container.innerHTML = addHighlight + highlights;
}

function renderPosts() {
  const grid = document.getElementById("postsGrid");

  grid.innerHTML = postsData
    .map(
      (post) => `
    <div class="post-item" data-id="${post.id}">
      <img src="${post.img}" alt="Post ${post.id}" loading="lazy">
      <div class="post-overlay">
        <span class="post-stat">
          <svg viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${formatCount(post.likes)}
        </span>
        <span class="post-stat">
          <svg viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>
          ${formatCount(post.comments)}
        </span>
      </div>
    </div>
  `
    )
    .join("");
}

function renderReels() {
  const grid = document.getElementById("reelsGrid");

  grid.innerHTML = reelsData
    .map(
      (reel) => `
    <div class="reel-item" data-id="${reel.id}">
      <img src="${reel.img}" alt="Reel ${reel.id}" loading="lazy">
      <div class="reel-overlay">
        <svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        ${formatCount(reel.views)}
      </div>
    </div>
  `
    )
    .join("");
}

function renderSavedPosts() {
  const grid = document.getElementById("savedPostsGrid");

  grid.innerHTML = savedPostsData
    .map(
      (post) => `
    <div class="post-item" data-id="${post.id}">
      <img src="${post.img}" alt="Saved post ${post.id}" loading="lazy">
      <div class="post-overlay">
        <span class="post-stat">
          <svg viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${formatCount(post.likes)}
        </span>
        <span class="post-stat">
          <svg viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>
          ${formatCount(post.comments)}
        </span>
      </div>
    </div>
  `
    )
    .join("");
}

function renderSavedReels() {
  const grid = document.getElementById("savedReelsGrid");

  grid.innerHTML = savedReelsData
    .map(
      (reel) => `
    <div class="reel-item" data-id="${reel.id}">
      <img src="${reel.img}" alt="Saved reel ${reel.id}" loading="lazy">
      <div class="reel-overlay">
        <svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        ${formatCount(reel.views)}
      </div>
    </div>
  `
    )
    .join("");
}

/* ==================== TABS ==================== */

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const sections = {
    posts: document.getElementById("postsGrid"),
    reels: document.getElementById("reelsGrid"),
    saved: document.getElementById("savedGrid"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      Object.entries(sections).forEach(([key, section]) => {
        if (key === target) {
          section.classList.remove("hidden");
        } else {
          section.classList.add("hidden");
        }
      });
    });
  });

  initSavedSubtabs();
}

function initSavedSubtabs() {
  const subtabs = document.querySelectorAll(".saved-subtab");
  const savedPostsGrid = document.getElementById("savedPostsGrid");
  const savedReelsGrid = document.getElementById("savedReelsGrid");

  subtabs.forEach((subtab) => {
    subtab.addEventListener("click", () => {
      const target = subtab.dataset.savedTab;

      subtabs.forEach((t) => t.classList.remove("active"));
      subtab.classList.add("active");

      if (target === "saved-posts") {
        savedPostsGrid.classList.remove("hidden");
        savedReelsGrid.classList.add("hidden");
      } else {
        savedPostsGrid.classList.add("hidden");
        savedReelsGrid.classList.remove("hidden");
      }
    });
  });
}

/* ==================== MODAL ==================== */

function initModal() {
  const modal = document.getElementById("editModal");
  const openBtn = document.getElementById("editProfileBtn");
  const closeBtn = document.getElementById("closeModal");
  const saveBtn = document.getElementById("saveProfile");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  saveBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

/* ==================== INITIALIZATION ==================== */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderHighlights();
  renderPosts();
  renderReels();
  renderSavedPosts();
  renderSavedReels();
  initTabs();
  initModal();
});
