// inputs
const offsetX = document.getElementById("offsetX");
const offsetY = document.getElementById("offsetY");
const blurInput = document.getElementById("blur");
const spread = document.getElementById("spread");
const opacity = document.getElementById("opacity");

// values
const offsetXValue = document.getElementById("offsetXValue");
const offsetYValue = document.getElementById("offsetYValue");
const blurValue = document.getElementById("blurValue");
const spreadValue = document.getElementById("spreadValue");
const opacityValue = document.getElementById("opacityValue");

const previewBox = document.getElementById("previewBox");
const cssCode = document.getElementById("cssCode");
const copyBtn = document.getElementById("copyBtn");

function updateShadow() {
  const x = offsetX.value;
  const y = offsetY.value;
  const b = blurInput.value;
  const s = spread.value;
  const o = opacity.value / 100;

  const shadow = `${x}px ${y}px ${b}px ${s}px rgba(0, 0, 0, ${o})`;

  previewBox.style.boxShadow = shadow;
  offsetXValue.textContent = `${x}px`;
  offsetYValue.textContent = `${y}px`;
  blurValue.textContent = `${b}px`;
  spreadValue.textContent = `${s}px`;
  opacityValue.textContent = o.toFixed(2);
  cssCode.textContent = `box-shadow: ${shadow};`;
}

offsetX.addEventListener("input", updateShadow);
offsetY.addEventListener("input", updateShadow);
blurInput.addEventListener("input", updateShadow);
spread.addEventListener("input", updateShadow);
opacity.addEventListener("input", updateShadow);

// copy button functionality
copyBtn.addEventListener("click", () => {
  const text = cssCode.textContent;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });
});
