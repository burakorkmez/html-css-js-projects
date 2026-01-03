const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");

toggleBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  // ternary operator
  passwordInput.type = isPassword ? "text" : "password";

  eyeIcon.classList.toggle("hidden");
  eyeOffIcon.classList.toggle("hidden");
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // this will prevent page reload
  alert("Form submitted!");
});
