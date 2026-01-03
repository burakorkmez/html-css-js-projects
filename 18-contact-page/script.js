const form = document.getElementById("contact-form");
const successState = document.getElementById("success");
const resetBtn = document.getElementById("reset-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // this will prevent reloading the page

  const submitBtn = form.querySelector(".submit-btn");

  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // simulate api call
  setTimeout(() => {
    form.classList.add("hidden");
    successState.classList.remove("hidden");
  }, 2000);
});

resetBtn.addEventListener("click", () => {
  form.reset();
  form.classList.remove("hidden");
  successState.classList.add("hidden");

  const submitBtn = form.querySelector(".submit-btn");

  submitBtn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
  submitBtn.disabled = false;
});
