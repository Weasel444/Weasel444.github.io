function getChapterFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("chapter");
}

function getChapterData(id) {
  return CHAPTERS.find(ch => ch.id === id);
}

function createNav(currentIndex) {
  const nav = document.createElement('div');
  nav.className = 'chapter-nav';

  if (currentIndex > 0) {
    const prev = CHAPTERS[currentIndex - 1];
    nav.innerHTML += `<a href="chapter.html?chapter=${prev.id}" class="nav-button previous">← Previous</a>`;
  }

  if (currentIndex < CHAPTERS.length - 1) {
    const next = CHAPTERS[currentIndex + 1];
    nav.innerHTML += `<a href="chapter.html?chapter=${next.id}" class="nav-button">Next →</a>`;
  }

  return nav;
}

function loadChapter() {
  const container = document.getElementById('chapter-container');
  const chapterId = getChapterFromURL();

  const chapterIndex = CHAPTERS.findIndex(c => c.id === chapterId);
  const chapter = CHAPTERS[chapterIndex];

  if (!chapter) {
    container.innerHTML = "<p>Chapter not found</p>";
    return;
  }

  document.title = chapter.title;

  // PRELOAD FIRST PANELS
  const preloadCount = 3;

  for (let i = 1; i <= preloadCount; i++) {
    const num = String(i).padStart(3, '0');
    const src = `${chapter.folder}/${num}.jpg`;

    const panel = document.createElement('div');
    panel.className = 'panel';

    const img = new Image();
    img.src = src;

    img.onload = () => {
      const ratio = img.height / img.width;
      panel.style.height = `${container.offsetWidth * ratio}px`;
      panel.style.backgroundImage = `url('${src}')`;
      panel.classList.add('loaded');
    };

    container.appendChild(panel);
  }

  // LAZY LOAD REST
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const panel = entry.target;
      const src = panel.dataset.src;

      const img = new Image();
      img.src = src;

      img.onload = () => {
        const ratio = img.height / img.width;
        panel.style.height = `${panel.offsetWidth * ratio}px`;
        panel.style.backgroundImage = `url('${src}')`;
        panel.classList.add('loaded');
      };

      observer.unobserve(panel);
    });
  }, { rootMargin: "200px" });

  for (let i = preloadCount + 1; i <= chapter.count; i++) {
    const num = String(i).padStart(3, '0');
    const src = `${chapter.folder}/${num}.jpg`;

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.dataset.src = src;

    container.appendChild(panel);
    observer.observe(panel);
  }

  // NAVIGATION
  container.after(createNav(chapterIndex));
}

document.addEventListener("DOMContentLoaded", loadChapter);
