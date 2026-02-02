const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const pokemonCard = document.getElementById("pokemonCard");
const errorDiv = document.getElementById("error");
const pokemonImg = document.getElementById("pokemonImg");
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonTypes = document.getElementById("pokemonTypes");
const pokemonStats = document.getElementById("pokemonStats");

const suggestions = document.querySelectorAll(".suggestion");

const MAX_POKEMON = 1025;

async function searchPokemon() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  if (!searchInput) return;

  // hide the previous results
  pokemonCard.classList.add("hidden");
  errorDiv.classList.add("hidden");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);

    if (!response.ok) throw new Error("Not found");

    const pokemon = await response.json();
    console.log(pokemon);
    displayPokemon(pokemon);
  } catch (error) {
    errorDiv.classList.remove("hidden");
  }
}

function displayPokemon(pokemon) {
  pokemonImg.src =
    pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  pokemonName.textContent = pokemon.name;
  pokemonId.textContent = `#${pokemon.id}`;

  pokemonTypes.innerHTML = pokemon.types
    .map((t) => `<span class="type">${t.type.name}</span>`)
    .join("");

  const mainStats = ["hp", "attack", "defense", "speed"];
  pokemonStats.innerHTML = pokemon.stats
    .filter((s) => mainStats.includes(s.stat.name))
    .map(
      (s) => `
      <div class="stat">
        <span class="stat-name">${s.stat.name}</span>
        <span class="stat-value">${s.base_stat}</span>
      </div>
    `,
    )
    .join("");

  pokemonCard.classList.remove("hidden");
}

function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
  searchInput.value = randomId;
  searchPokemon();
}

// event listeners
searchBtn.addEventListener("click", searchPokemon);
randomBtn.addEventListener("click", getRandomPokemon);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchPokemon();
});

suggestions.forEach((btn) => {
  btn.addEventListener("click", () => {
    searchInput.value = btn.dataset.name;
    searchPokemon();
  });
});

// load random pokemo on start
getRandomPokemon();
