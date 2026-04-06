function loadPanels(folder, baseName, totalImages, extension) {
  const container = document.getElementById("panel-container");

  for (let i = 1; i <= totalImages; i++) {
    const num = String(i).padStart(3, '0');
    const path = `${encodeURI(folder)}/${encodeURI(baseName)}_${num}.${extension}`;

    const panel = document.createElement("div");
    panel.className = "panel";

    const img = new Image();
    img.onload = function () {
      const ratio = this.height / this.width;
      panel.style.paddingTop = `${ratio * 100}%`; // keeps ratio
      panel.style.backgroundImage = `url("${encodeURI(path)}")`;
    };
    img.src = path;
    
    container.appendChild(panel);
  }
}

//IMG instead of BG IMG
//function loadPanels(folder, baseName, totalImages, extension) {
//  const container = document.getElementById("panel-container");
//
//  for (let i = 1; i <= totalImages; i++) {
//    const num = String(i).padStart(3, '0');
//    
//    const img = document.createElement("img");
//    img.src = `${encodeURI(folder)}/${encodeURI(baseName)}_${num}.${extension}`;
//    img.className = "panel";
//        
//    container.appendChild(img);
//  }
//}
