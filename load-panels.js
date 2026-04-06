function loadPanels(folder, baseName, totalImages, extension) {
  const container = document.getElementById("panel-container");

  for (let i = 1; i <= totalImages; i++) {
    // Pad the number to 3 digits, e.g., 001, 002
    const num = String(i).padStart(3, '0');
    const panel = document.createElement("div");
    panel.className = 'panel';
    panel.style.backgroundImage = `${folder}/${baseName}_${num}.${extension}`;
    container.appendChild(panel);
  }
}
