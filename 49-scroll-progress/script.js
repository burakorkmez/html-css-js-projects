const progressBar = document.getElementById("progressBar");
const badge = document.getElementById("badge");

function updateProgress() {
  // how many pixels we have scrolled from the top
  const scrollTop = window.scrollY;

  // total scrollable height (full page height minus visible window height)
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // calculate scroll percentage (0-100)
  const progress = Math.round((scrollTop / docHeight) * 100);

  progressBar.style.width = progress + "%";
  badge.textContent = progress + "% read";

  if (progress >= 100) {
    badge.classList.add("complete");
    badge.textContent = "✓ Complete";
  } else {
    badge.classList.remove("complete");
  }
}

window.addEventListener("scroll", updateProgress);
