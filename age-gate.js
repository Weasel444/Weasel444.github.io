// Age Gate Logic

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("age-overlay");
    const button = document.getElementById("age-confirm-btn");

    // Check if user already confirmed
    if (localStorage.getItem("ageConfirmed") === "true") {
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    // When button is clicked
    if (button) {
        button.addEventListener("click", function () {
            localStorage.setItem("ageConfirmed", "true");
            overlay.style.display = "none";
        });
    }
});
