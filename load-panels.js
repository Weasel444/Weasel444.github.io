function loadPanels(folder, baseName, totalImages, extension) {
  const container = document.getElementById("panel-container");

  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0');
    
    const panel = document.createElement("div");
    panel.className = 'panel';
    
    panel.style.backgroundImage = `url("${folder}/${baseName}_${num}.${extension}")`;
    
    container.appendChild(panel);
  }
}
