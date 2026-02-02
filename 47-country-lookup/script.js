const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

async function searchCountry() {
  const query = searchInput.value.trim();
  if (!query) return;

  // hide previous results
  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);

    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    console.log(data[0]);
    displayCountry(data[0]);
  } catch (error) {
    errorDiv.classList.remove("hidden");
  }
}

function displayCountry(country) {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";

  resultDiv.innerHTML = `
    <div class="flag">${country.flag}</div>
    <h2 class="country-name">${country.name.common}</h2>
    
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Capital</span>
        <span class="info-value">${country.capital?.[0] || "N/A"}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Region</span>
        <span class="info-value">${country.region}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Population</span>
        <span class="info-value">${country.population.toLocaleString()}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Currency</span>
        <span class="info-value">${currencies}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Languages</span>
        <span class="info-value">${languages}</span>
      </div>
    </div>
  `;

  resultDiv.classList.remove("hidden");
}

searchBtn.addEventListener("click", searchCountry);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCountry();
});

// search for Indonesia by default on page load
searchInput.value = "Indonesia";
searchCountry();
