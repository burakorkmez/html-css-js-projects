const radiusSlider = document.getElementById("radiusSlider");
const previewBox = document.getElementById("previewBox");
const radiusValue = document.getElementById("radiusValue");
const cssCode = document.getElementById("cssCode");
const copyBtn = document.getElementById("copyBtn");

radiusSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  const radius = `${value}px`;

  previewBox.style.borderRadius = radius;
  radiusValue.textContent = radius;
  cssCode.textContent = `border-radius: ${radius}`;
});

copyBtn.addEventListener("click", () => {
  const text = cssCode.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });
});
