const inputs = document.querySelectorAll(".otp-input");
const container = document.querySelector(".otp-container");
const resendBtn = document.getElementById("resend-btn");
const continueBtn = document.getElementById("continue-btn");
const feedback = document.getElementById("feedback-ui");

inputs.forEach((input, i) => {
  input.addEventListener("input", (e) => {
    // this is to prevent the user from typing anything other than a number
    if (!/^\d$/.test(e.target.value)) {
      e.target.value = "";
      return;
    }
    // this is to focus the next input when the user types a number - ignoring the last input
    if (e.target.value && i < inputs.length - 1) inputs[i + 1].focus();

    if ([...inputs].every((inp) => inp.value)) {
      setTimeout(() => {
        container.style.display = "none";
        resendBtn.style.display = "none";
        feedback.classList.remove("hidden");
      }, 400);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && i > 0) {
      inputs[i - 1].focus();
    }
  });
});

continueBtn.addEventListener("click", () => {
  // reset the UI
  feedback.classList.add("hidden");
  container.style.display = "flex";
  resendBtn.style.display = "flex";
  inputs.forEach((inp) => (inp.value = ""));
  inputs[0].focus();
});

inputs[0].focus();
