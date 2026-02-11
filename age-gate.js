document.addEventListener("DOMContentLoaded", function () {

  // If user already confirmed age, do nothing
  if (localStorage.getItem("ageConfirmed") === "true") {
    return;
  }

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "age-overlay";

  overlay.innerHTML = `
    <div class="age-popup">
      <img src="images/Nethaniel_warning.jpg" alt="Warning">

      <h2>Are you 18 years or older?</h2>
      <p>This comic contains nudity and sexual content</p>

      <button class="age-button">I am 18 or older</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Button logic
  const button = overlay.querySelector(".age-button");

  button.addEventListener("click", function () {
    localStorage.setItem("ageConfirmed", "true");
    overlay.remove();
  });

});
