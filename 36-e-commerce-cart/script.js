// DOM Elements
const cartItems = document.querySelectorAll(".cart-item");
const itemCount = document.getElementById("itemCount");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const cartItemsContainer = document.getElementById("cartItems");
const cartSummary = document.querySelector(".cart-summary");
const emptyCart = document.getElementById("emptyCart");

function updateCart() {
  let totalItems = 0;
  let subtotal = 0;

  // get all cart items
  const currentCartItems = document.querySelectorAll(".cart-item");

  currentCartItems.forEach((item) => {
    const quantity = parseInt(item.querySelector(".quantity").textContent);
    const price = parseFloat(item.querySelector(".item-price").textContent.replace("$", ""));

    const itemTotal = quantity * price;

    item.querySelector(".item-total").textContent = `$${itemTotal.toFixed(2)}`;
    totalItems += quantity;
    subtotal += itemTotal;
  });

  const shipping = 10.0;
  const total = shipping + subtotal;

  const uniqueItems = document.querySelectorAll(".cart-item").length;

  // show empty cart UI if no items
  if (uniqueItems === 0) {
    emptyCart.style.display = "flex";
    cartItemsContainer.style.display = "none";
    cartSummary.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartSummary.style.display = "block";
  }

  // update summary display
  itemCount.textContent = `${uniqueItems} ${uniqueItems === 1 ? "item" : "items"}`;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

cartItems.forEach((item) => {
  const qtyBtns = item.querySelectorAll(".qty-btn");
  const quantityEl = item.querySelector(".quantity");
  const removeBtn = item.querySelector(".remove-btn");

  qtyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let qty = parseInt(quantityEl.textContent);
      if (btn.dataset.action === "increase") qty++;
      else if (btn.dataset.action === "decrease" && qty > 1) qty--;

      quantityEl.textContent = qty;

      updateCart();
    });
  });

  removeBtn.addEventListener("click", () => {
    item.remove();
    updateCart();
  });
});

// initial cart update on page load
updateCart();
