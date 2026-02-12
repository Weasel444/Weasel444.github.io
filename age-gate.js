document.addEventListener("DOMContentLoaded", function () {

  if (localStorage.getItem("ageConfirmed") === "true") {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "age-overlay";

  overlay.innerHTML = `
    <div class="age-popup">
      <img src="images/Nethaniel_warning.jpg" alt="Warning">

      <h2>Are you 18 years or older?</h2>
      <p>This comic contains nudity and sexual content</p>

      <button class="age-confirm">I am 18+ and want to continue</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const button = overlay.querySelector(".age-confirm");

  button.addEventListener("click", function () {
    localStorage.setItem("ageConfirmed", "true");
    overlay.remove();
  });

});
