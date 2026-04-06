function loadPanels(folder, baseName, totalImages, extension) {
  const container = document.getElementById("panel-container");

  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0');

    const panel = document.createElement("div");
    panel.className = "panel";

    const path = `${folder}/${baseName}_${num}.${extension}`;
    panel.style.backgroundImage = `url("${encodeURI(path)}")`;

    container.appendChild(panel);
  }
}
