// new Date(year, month, day, hour, minute)
// Note: month is 0-indexed (0 = Jan, 11 = Dec)
const launchDate = new Date(2026, 0, 1, 12, 0); // Jan 1, 2026, at 12:00 PM

// DOM ELEMENTS
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const emailForm = document.getElementById("email-form");
const successMessage = document.getElementById("success");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// init call
updateCountdown();

// update every second
setInterval(updateCountdown, 1000);

emailForm.addEventListener("submit", (e) => {
  e.preventDefault(); // this will make sure to not reaload the page

  const button = emailForm.querySelector("button");

  button.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i>";
  button.disabled = true;

  // simulate an api call
  setTimeout(() => {
    emailForm.classList.add("hidden");
    successMessage.classList.remove("hidden");
  }, 1000);
});
