// Lorem Picsum - free image API, no key needed!
const imageGrid = document.getElementById("imageGrid");
const loadMoreBtn = document.getElementById("loadMore");
const shuffleBtn = document.getElementById("shuffleBtn");
const errorMessage = document.getElementById("errorMessage");

// https://picsum.photos/v2/list?page=1&limit=12

let currentPage = Math.floor(Math.random() * 30) + 1;
const imagesPerPage = 12;

// load initial images
loadImages(currentPage);

loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  loadImages(currentPage);
});

shuffleBtn.addEventListener("click", () => {
  currentPage = Math.floor(Math.random() * 30) + 1;
  imageGrid.innerHTML = "";
  loadImages(currentPage);
});

async function loadImages(page) {
  try {
    // hide any previous errors
    errorMessage.style.display = "none";

    // show loading spinner
    imageGrid.innerHTML += '<div class="loading"><div class="spinner"></div></div>';

    const response = await fetch(`
      https://picsum.photos/v2/list?page=${page}&limit=${imagesPerPage}
      `);

    // remove the loading spinner - bc we just fetched some data
    const loading = imageGrid.querySelector(".loading");
    if (loading) loading.remove();

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const images = await response.json();
    console.log(images);
    displayImages(images);
  } catch (error) {
    // remove loading if exists
    const loading = imageGrid.querySelector(".loading");
    if (loading) loading.remove();

    // show error message
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}

function displayImages(images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "image-card";

    const imageUrl = `https://picsum.photos/id/${image.id}/600/400`;

    card.innerHTML = `
     <img src="${imageUrl}" alt="Photo by ${image.author}">
      <div class="overlay">
        <a href="${image.url}" target="_blank">Photo by ${image.author}</a>
      </div>
    `;

    imageGrid.appendChild(card);
  });
}
