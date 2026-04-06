function loadPanels(folder, baseName, start, end, extension) {
  const container = document.getElementById("panel-container");

  for (let i = start; i <= end; i++) {
    const panel = document.createElement("div");
    panel.className = 'panel';
    panel.style.backgroundImage = `${folder}/${baseName}${i}.${extension}`;
    container.appendChild(panel);
  }
}
