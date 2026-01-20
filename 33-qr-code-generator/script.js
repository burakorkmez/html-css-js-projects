const inputText = document.getElementById("inputText");
const sizeSelect = document.getElementById("size");
const generateBtn = document.getElementById("generateBtn");
const qrSection = document.getElementById("qrSection");
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");

let qrCodeInstance = null;
let qrCodeDataUrl = "";

generateBtn.addEventListener("click", () => {
  const text = inputText.value.trim();

  if (!text) {
    alert("Please enter some text or URL");
    return;
  }

  const size = parseInt(sizeSelect.value);

  // clear previous QR Code
  qrContainer.innerHTML = "";

  // check if QRCodelib is loaded - optional but good to have
  if (typeof QRCode === "undefined") {
    alert("QR Code library is still loading. Please wait a moment and try again.");
    return;
  }

  // generate QR Code using the qrcodejs lib

  qrCodeInstance = new QRCode(qrContainer, {
    text,
    width: size,
    height: size,
    colorDark: "#000",
    colorLight: "#fff",
    correctionLevel: QRCode.CorrectLevel.H,
  });

  // wait for QR code to render - then get canvas
  setTimeout(() => {
    const canvas = qrContainer.querySelector("canvas");
    if (canvas) {
      qrCodeDataUrl = canvas.toDataURL("image/png");
      qrSection.classList.add("show");
    }
  }, 100);
});

downloadBtn.addEventListener("click", () => {
  if (!qrCodeDataUrl) return;

  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = qrCodeDataUrl;
  link.click();
});

// generete on enter key (Ctrl/CMD + Enter)
inputText.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    generateBtn.click();
  }
});

// QR codes have 4 standard error correction levels:
// L (Low) – recovers about 7% of data
// M (Medium) – recovers about 15% of data
// Q (Quartile) – recovers about 25% of data
// H (High) – recovers about 30% of data

// So QRCode.CorrectLevel.H means:
// Use the highest error correction, so the QR code can still be scanned even if up to ~30% is damaged/obscured.
// Trade‑off: more robust but denser QR code (more modules/squares), which can be a bit harder to scan on very small sizes.
