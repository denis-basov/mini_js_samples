const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const random = document.getElementById("random");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

/**
 * Search meal and fetch from API
 */
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are no results. Try again!</h2>`;
          mealsEl.innerHTML = "";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
          `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Fetch meal by id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function randomMeal() {
  // clear meals and headings
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  // fetch random meal
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add one meal to DOM
function addMealToDOM(meal) {
  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li>${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}</li>`;
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Event listeners
 */

// send search form
submit.addEventListener("submit", searchMeal);

// click random button
random.addEventListener("click", randomMeal);

// click on meal from list
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.target.closest(".meal-info");

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealById(mealID);
  }
});
