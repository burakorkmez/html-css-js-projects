const generateBtn = document.getElementById("generateBtn");
const mealCard = document.getElementById("mealCard");
const mealImg = document.getElementById("mealImg");
const mealName = document.getElementById("mealName");
const mealCategory = document.getElementById("mealCategory");
const mealArea = document.getElementById("mealArea");
const mealInstructions = document.getElementById("mealInstructions");
const youtubeLink = document.getElementById("youtubeLink");

async function getRandomMeal() {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();

    console.log(data);

    displayMeal(data.meals[0]);
  } catch (error) {
    console.error("Error fetching meal:", error);
  }
}

function displayMeal(meal) {
  mealImg.src = meal.strMealThumb;
  mealName.textContent = meal.strMeal;
  mealCategory.textContent = meal.strCategory;
  mealArea.textContent = meal.strArea;
  mealInstructions.textContent = meal.strInstructions;

  // if there is a youtube link, show the btn else hide it
  if (meal.strYoutube) {
    youtubeLink.href = meal.strYoutube;
    youtubeLink.classList.remove("hidden");
  } else youtubeLink.classList.add("hidden");

  mealCard.classList.remove("hidden");
}

generateBtn.addEventListener("click", getRandomMeal);

getRandomMeal();
