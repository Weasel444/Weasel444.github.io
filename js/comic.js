// comic.js

// -------------------
// Get chapter from URL
// -------------------
const params = new URLSearchParams(window.location.search);
let chapterId = params.get("chapter");

// Default to chapter01 if no parameter (index.html)
if (!chapterId) chapterId = "chapter01";

// Find chapter data
const chapterIndex = CHAPTERS.findIndex(c => c.id === chapterId);
if (chapterIndex === -1) {
  console.error("Chapter not found:", chapterId);
  throw new Error("Chapter not found");
}

const chapter = CHAPTERS[chapterIndex];

// Container
const container = document.getElementById('chapter-container');

// -------------------
// Image Loading
// -------------------
const preloadCount = 3;
let loadedCount = 0;
let navAdded = false;

for (let i = 1; i <= chapter.count; i++) {
  const num = String(i).padStart(3, '0');
  const src = `${chapter.folder}/${chapter.prefix}${num}.jpg`;

  const panel = document.createElement('div');
  panel.className = 'panel';

  // First images load immediately
  if (i <= preloadCount) {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const ratio = img.height / img.width;
      panel.style.height = `${container.offsetWidth * ratio}px`;
      panel.style.backgroundImage = `url('${src}')`;

      loadedCount++;

      // 👇 Add navigation AFTER first images loaded
      if (!navAdded && loadedCount === preloadCount) {
        const nav = createNav(chapterIndex);
        container.parentNode.appendChild(nav);
        navAdded = true;
      }
    };
  } else {
    // Lazy load later
    panel.dataset.src = src;
  }

  container.appendChild(panel);
}

// -------------------
// Lazy Loading
// -------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const panel = entry.target;
    const src = panel.dataset.src;

    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      const ratio = img.height / img.width;
      panel.style.height = `${panel.offsetWidth * ratio}px`;
      panel.style.backgroundImage = `url('${src}')`;
    };

    observer.unobserve(panel);
  });
}, { rootMargin: "200px" });

// Observe lazy panels
document.querySelectorAll('.panel').forEach(panel => {
  if (panel.dataset.src) {
    observer.observe(panel);
  }
});

// -------------------
// Navigation
// -------------------
function createNav(currentIndex) {
  const nav = document.createElement('div');
  nav.className = 'chapter-nav';

  const chapter = CHAPTERS[currentIndex];
  let buttons = 0;

  // Special single button (last chapter)
  if (chapter.endLink) {
    nav.innerHTML = `
      <a href="${chapter.endLink}" 
         class="nav-button" 
         target="_blank" 
         rel="noopener">
         ${chapter.endButtonText}
      </a>
    `;
    nav.classList.add('single');
    return nav;
  }

  // Previous
  if (currentIndex > 0) {
    const prev = CHAPTERS[currentIndex - 1];

    const prevHref =
      (currentIndex - 1 === 0)
        ? 'index.html'
        : `chapter.html?chapter=${prev.id}`;

    nav.innerHTML += `
      <a href="${prevHref}" class="nav-button previous">
        ← Previous
      </a>
    `;
    buttons++;
  }

  // Next
  if (currentIndex < CHAPTERS.length - 1) {
    const next = CHAPTERS[currentIndex + 1];

    nav.innerHTML += `
      <a href="chapter.html?chapter=${next.id}" class="nav-button">
        Next →
      </a>
    `;
    buttons++;
  }

  // Center single button
  if (buttons === 1) {
    nav.classList.add('single');
  }

  return nav;
}

// -------------------
// Disable right-click / zoom
// -------------------
document.addEventListener("contextmenu", e => e.preventDefault());

let lastTouchEnd = 0;
document.addEventListener('touchend', event => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
