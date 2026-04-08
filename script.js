(function () {

  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter") || "chapter01";

  const chapterIndex = CHAPTERS.findIndex(c => c.id === chapterId);
  const chapter = CHAPTERS[chapterIndex];

  if (!chapter) return;

  const container = document.getElementById("chapter-container");

  // --- PRELOAD FIRST 2 IMAGES ---
  for (let i = 1; i <= 2; i++) {
    const img = new Image();
    img.src = getImagePath(chapter, i);
  }

  // --- LOAD ALL IMAGES ---
  for (let i = 1; i <= chapter.count; i++) {
    const img = document.createElement("img");

    img.loading = (i <= 2) ? "eager" : "lazy";
    img.src = getImagePath(chapter, i);

    container.appendChild(img);
  }

  // --- NAVIGATION ---
  const nav = document.getElementById("nav-buttons");

  // Chapter 01
  if (chapterIndex === 0) {
    nav.appendChild(createButton("Next", getChapterLink(chapterIndex + 1)));
  }

  // Chapters 02–06
  else if (chapterIndex < CHAPTERS.length - 1) {
    nav.appendChild(createButton("Previous", getChapterLink(chapterIndex - 1)));
    nav.appendChild(createButton("Next", getChapterLink(chapterIndex + 1)));
  }

  // Chapter 07
  else {
    const btn = document.createElement("a");
    btn.className = "nav-btn";
    btn.textContent = "Go to Patreon";
    btn.href = "https://www.patreon.com/desmira";
    btn.target = "_blank";
    nav.appendChild(btn);
  }


  // --- HELPERS ---

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
