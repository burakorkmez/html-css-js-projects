const coinsEl = document.getElementById("coins");
const loadingEl = document.getElementById("loading");

const COIN_IDS = ["bitcoin", "ethereum", "solana", "ripple", "dogecoin", "cardano"];

function formatPrice(value) {
  return "$" + value.toLocaleString();
}

function formatChange(value) {
  const sign = value >= 0 ? "+" : "";
  return sign + value.toFixed(2) + "%";
}

function showError(msg) {
  loadingEl.textContent = msg;
  loadingEl.style.color = "var(--down)";
}

function renderCoins(coins) {
  loadingEl.remove();

  coins.forEach((c) => {
    const change = c.price_change_percentage_24h;
    const changeClass = change === null ? "" : change >= 0 ? "up" : "down";

    const card = document.createElement("div");
    card.className = "coin";

    const icon = document.createElement("div");
    icon.className = "coin-icon";

    const info = document.createElement("div");
    info.className = "coin-info";

    const name = document.createElement("span");
    name.className = "coin-name";

    const symbol = document.createElement("span");
    symbol.className = "coin-symbol";

    const price = document.createElement("div");
    price.className = "coin-price";

    const changeEl = document.createElement("div");
    changeEl.className = "coin-change";

    if (c.image) {
      const img = document.createElement("img");
      img.src = c.image;
      img.alt = "Coin Icon";
      icon.appendChild(img);
    }

    name.textContent = c.name;
    symbol.textContent = c.symbol.toUpperCase();
    price.textContent = formatPrice(c.current_price);
    changeEl.textContent = formatChange(change);
    if (changeClass) changeEl.classList.add(changeClass);

    info.appendChild(name);
    info.appendChild(symbol);

    card.appendChild(icon);
    card.appendChild(info);
    card.appendChild(price);
    card.appendChild(changeEl);

    coinsEl.appendChild(card);
  });
}

fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}`)
  .then((res) => res.json())
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) {
      showError("No data. Try again later.");
      return;
    }

    renderCoins(data);
  })
  .catch(() => showError("Could not load prices."));
