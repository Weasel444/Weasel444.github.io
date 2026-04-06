function loadPanels(folder, baseName, totalImages, extension) {
  const container = document.getElementById("panel-container");

  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0');
    
    const img = document.createElement("img");
    img.src = `${folder}/${baseName}_${num}.${extension}`;
    img.className = "panel";
        
    container.appendChild(img);
  }
}
