const nameInput = document.getElementById("nameInput");
const predictBtn = document.getElementById("predictBtn");
const result = document.getElementById("result");
const genderIcon = document.getElementById("genderIcon");
const genderText = document.getElementById("genderText");
const probability = document.getElementById("probability");
const count = document.getElementById("count");

async function predictGender() {
  const name = nameInput.value.trim();

  if (!name) return alert("Please enter a name");

  try {
    // https://api.genderize.io/?name=john

    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";

    const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
    const data = await response.json();

    if (data.gender) {
      genderIcon.textContent = data.gender === "male" ? "♂️" : "♀️";
      genderText.textContent = data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
      probability.textContent = `${(data.probability * 100).toFixed(1)}% confidence`;
      count.textContent = `Based on ${data.count} data points`;
    } else {
      genderIcon.textContent = "❓";
      genderText.textContent = "Not found";
      probability.textContent = "No data available for this name";
      count.textContent = "";
    }
  } catch (error) {
    alert("Error fetching data. Please try again.");
    console.error(error);
  } finally {
    predictBtn.disabled = false;
    predictBtn.textContent = "Predict";
  }
}

predictBtn.addEventListener("click", predictGender);

nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") predictGender();
});

// const name = "John Doe";
// encodeURIComponent(name);  // Returns: "John%20Doe"
// Space becomes %20
// Common characters it encodes:
// Space → %20
// & → %26
// + → %2B
// = → %3D
// ? → %3F
// # → %23
