const targetDateInput = document.getElementById("targetDate");
const startBtn = document.getElementById("startBtn");
const countdownDisplay = document.getElementById("countdownDisplay");
const message = document.getElementById("message");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval = null;

function updateCountdown() {
  const targetDate = new Date(targetDateInput.value).getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  // time is up
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownDisplay.style.display = "none";
    message.textContent = "⏰ Time's up! The countdown has ended.";
    message.className = "message complete";
    return;
  }

  // you don't need to memorize this formula - you'll most likely to find it online or from AI
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //   25 15 10 09
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
  if (!targetDateInput.value) {
    message.textContent = "Please select a date and time.";
    message.className = "message error";
    return;
  }

  // clear any existing intervals
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // reset message
  message.textContent = "";
  message.className = "message";

  // show countdown display
  countdownDisplay.style.display = "flex";

  updateCountdown();

  countdownInterval = setInterval(updateCountdown, 1000);
});

// set min date to today
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
targetDateInput.min = now.toISOString().slice(0, 16);
