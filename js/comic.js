// comic.js

// Get chapter ID from URL
const params = new URLSearchParams(window.location.search);
let chapterId = params.get("chapter");

// If no chapter specified (index.html), default to chapter01
if (!chapterId) chapterId = "chapter01";

// Find chapter data
const chapterIndex = CHAPTERS.findIndex(c => c.id === chapterId);
if (chapterIndex === -1) {
  console.error("Chapter not found:", chapterId);
  throw new Error("Chapter not found");
}
const chapter = CHAPTERS[chapterIndex];

// Container where panels will be added
const container = document.getElementById('chapter-container') || document.getElementById(`${chapterId}-container`);

// Create panels dynamically
for (let i = 1; i <= chapter.count; i++) {
  const num = String(i).padStart(3, '0');
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.style.backgroundImage = `url('${chapter.folder}/${chapter.prefix}${num}.jpg')`;

  // Resize based on image aspect ratio
  const img = new Image();
  img.src = `${chapter.folder}/${chapter.prefix}${num}.jpg`;
  img.onload = () => {
    const ratio = img.height / img.width;
    panel.style.height = `${panel.offsetWidth * ratio}px`;
    panel.classList.add('loaded'); // fade-in effect
  };

  container.appendChild(panel);
}

// -------------------
// Navigation
// -------------------
function createNav(currentIndex) {
  const nav = document.createElement('div');
  nav.className = 'chapter-nav';

  const chapter = CHAPTERS[currentIndex];
  let buttons = 0;

  // Special single button (first or last chapter)
  if (chapter.endLink) {
    nav.innerHTML = `<a href="${chapter.endLink}" class="nav-button" target="_blank" rel="noopener">${chapter.endButtonText}</a>`;
    nav.classList.add('single');
    buttons = 1;
  } else {
    // Previous button
    if (currentIndex > 0) {
      const prev = CHAPTERS[currentIndex - 1];
      const prevHref = (currentIndex - 1 === 0) ? 'index.html' : `chapter.html?chapter=${prev.id}`;
      nav.innerHTML += `<a href="${prevHref}" class="nav-button previous">← Previous</a>`;
      buttons++;
    }

    // Next button
    if (currentIndex < CHAPTERS.length - 1) {
      const next = CHAPTERS[currentIndex + 1];
      nav.innerHTML += `<a href="chapter.html?chapter=${next.id}" class="nav-button">Next →</a>`;
      buttons++;
    }

    // Center if only one button
    if (buttons === 1) nav.classList.add('single');
  }

  return nav;
}

// Append navigation after panels
const nav = createNav(chapterIndex);
container.parentNode.appendChild(nav);

// -------------------
// Disable right-click and double-tap zoom
// -------------------
document.addEventListener("contextmenu", e => e.preventDefault());

let lastTouchEnd = 0;
document.addEventListener('touchend', event => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) event.preventDefault();
  lastTouchEnd = now;
}, false);
