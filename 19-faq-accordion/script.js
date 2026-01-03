const items = document.querySelectorAll(".faq-item");

// this is the implementation where we have only one question open at a time
items.forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    items.forEach((i) => i.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// this is the implementation where we can have all items open at the same time
// items.forEach((item) => {
//   item.addEventListener("click", () => {
//     item.classList.toggle("active")
//   });
// });
