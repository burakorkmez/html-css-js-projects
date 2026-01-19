const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const signupForm = document.getElementById("signupForm");

const requirements = {
  length: document.getElementById("length"),
  lowercase: document.getElementById("lowercase"),
  uppercase: document.getElementById("uppercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

// toggle password visibility
toggleBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleBtn.textContent = isPassword ? "🙈" : "👁️";
});

// check password strength
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  let strength = 0;

  // check each requirement - regex
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[-!@#$%^&*(),.?":{}|_<>]/.test(password),
  };

  // update requirement list
  for (const [key, passed] of Object.entries(checks)) {
    if (passed) {
      requirements[key].classList.add("valid");
      strength++;
    } else {
      requirements[key].classList.remove("valid");
    }
  }

  updateStrength(strength, password.length);
});

function updateStrength(strength, length) {
  if (length === 0) {
    strengthBar.style.width = "0%";
    strengthText.textContent = "Enter a password";
    strengthText.style.color = "#666";
    return;
  }

  const levels = [
    { min: 0, width: "20%", class: "weak", text: "Very Weak", color: "#ef4444" },
    { min: 2, width: "40%", class: "weak", text: "Weak", color: "#ef4444" },
    { min: 3, width: "60%", class: "fair", text: "Fair", color: "#f59e0b" },
    { min: 4, width: "80%", class: "good", text: "Good", color: "#ff6b00" },
    { min: 5, width: "100%", class: "strong", text: "Strong 💪", color: "#22c55e" },
  ];

  let level = levels[0];
  for (const l of levels) {
    if (strength >= l.min) {
      level = l;
    }
  }

  strengthBar.style.width = level.width;
  strengthBar.classList.add(level.class);
  strengthText.textContent = level.text;
  strengthText.style.color = level.color;
}

// handle form submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Account created successfully.");
});
