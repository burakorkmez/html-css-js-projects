const steps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentStep = 1;
const totalSteps = steps.length;

function updateProgress() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${progress}%`;

  // update step indicators
  steps.forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove("active", "completed");

    if (stepNum < currentStep) {
      step.classList.add("completed");
    } else if (stepNum === currentStep) {
      step.classList.add("active");
    }
  });

  // update form steps
  formSteps.forEach((step, index) => {
    step.classList.remove("active");
    if (currentStep === index + 1) {
      step.classList.add("active");
    }
  });

  prevBtn.disabled = currentStep === 1;
  nextBtn.textContent = currentStep === totalSteps ? "Submit" : "Next";
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
  }
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateProgress();
  } else {
    alert("Form submitted successfully! 🎉");
    currentStep = 1;
    updateProgress();
  }
}

prevBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);
