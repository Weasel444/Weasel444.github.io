(function () {

  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter") || "chapter01";

  const chapterIndex = CHAPTERS.findIndex(c => c.id === chapterId);
  const chapter = CHAPTERS[chapterIndex];

  if (!chapter) return;

  const container = document.getElementById("chapter-container");

  // Preload first 3 images of current chapter
for (let i = 1; i <= 3; i++) {
  const img = new Image();
  img.src = getImagePath(chapter, i);
}

// Preload first 3 images of next chapter
if (chapterIndex < CHAPTERS.length - 1) {
  const nextChapter = CHAPTERS[chapterIndex + 1];

  for (let i = 1; i <= 3; i++) {
    const img = new Image();
    img.src = getImagePath(nextChapter, i);
  }
}
  // Load images
  for (let i = 1; i <= chapter.count; i++) {
    const img = document.createElement("img");
    img.loading = (i <= 3) ? "eager" : "lazy";
    img.src = getImagePath(chapter, i);
    container.appendChild(img);
  }

  // Navigation (ONLY NEXT now)
  const nav = document.getElementById("nav-buttons");

  if (chapterIndex < CHAPTERS.length - 1) {
    nav.appendChild(createButton("Next", getChapterLink(chapterIndex + 1)));
  } else {
    const btn = document.createElement("a");
    btn.className = "nav-btn";
    btn.textContent = "Go to Patreon";
    btn.href = "https://www.patreon.com/desmira";
    btn.target = "_blank";
    nav.appendChild(btn);
  }

  // Menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menuOverlay = document.getElementById("menu-overlay");
  const menuContent = document.getElementById("menu-content");

  menuToggle.addEventListener("click", () => {
    menuOverlay.style.display = "block";
  });

  menuOverlay.addEventListener("click", () => {
    menuOverlay.style.display = "none";
  });

  // Build menu
  CHAPTERS.forEach((c, index) => {
    const btn = document.createElement("a");
    btn.className = "nav-btn";
    btn.textContent = `chapter ${index + 1}`;

    if (index === chapterIndex) {
      btn.style.background = "#8D9CC7";
    }
    btn.href = `?chapter=${c.id}`;
    menuContent.appendChild(btn);
  });

  const patreon = document.createElement("a");
  patreon.className = "nav-btn";
  patreon.textContent = "Go to Patreon";
  patreon.href = "https://www.patreon.com/desmira";
  patreon.target = "_blank";
  menuContent.appendChild(patreon);


  function getImagePath(chapter, index) {
    const num = String(index).padStart(3, "0");
    return `${chapter.folder}/${chapter.prefix}${num}.jpg`;
  }

  function getChapterLink(index) {
    return `?chapter=${CHAPTERS[index].id}`;
  }

  function createButton(text, link) {
    const a = document.createElement("a");
    a.className = "nav-btn";
    a.textContent = text;
    a.href = link;
    return a;
  }

})();
