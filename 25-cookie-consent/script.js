const banner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptBtn");
const declineBtn = document.getElementById("declineBtn");
const resetBtn = document.getElementById("resetBtn");

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  banner.classList.add("hidden");
});

declineBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "declined");
  banner.classList.add("hidden");
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("cookieConsent");
  banner.classList.remove("hidden");
});

function checkCookieConsent() {
  const consent = localStorage.getItem("cookieConsent");
  if (consent) {
    banner.classList.add("hidden");
  }
}

// check on page load
checkCookieConsent();
