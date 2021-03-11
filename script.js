let randomizeBtn = document.getElementById("randomizeBtn");
let mealBox = document.getElementById("mealBox");
let foodInput = document.getElementById("foodInput");
let foodSearchBtn = document.getElementById("foodSearchBtn");
let searchMealBox = document.getElementById("searchMealBox");

randomizeBtn.addEventListener("click", function () {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((respone) => respone.json())
    .then((data) => {
      console.log(data);

      createRandomMeal(data.meals[0]);
    });
});

const createRandomMeal = (meal) => {
  console.log(meal);
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }

    searchMealBox.innerHTML = "";
    mealBox.innerHTML = "";

    mealBox.insertAdjacentHTML(
      "beforeend",
      `<div class="food-container"> <div class="ingredients-container"> <h2> ${
        meal.strMeal
      }</h2> <h3> Origin: ${meal.strArea}</h3> <h3> Type of food: ${
        meal.strCategory
      } </h3> <ul class="ingredients">${ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("")} </ul> </div> <div class="food-image"> <img src="${
        meal.strMealThumb
      }" alt="Meal Image"> </div> </div> <div class="instructions-container"> <h2> Instructions: </h2> <p> ${
        meal.strInstructions
      } </p> </div>`
    );
  }
};

foodSearchBtn.addEventListener("click", function () {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodInput.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("search", data);

      createSearchedMeal(data.meals);
    });
});

const createSearchedMeal = (meal) => {
  console.log(meal[0].strArea);
  const searchIngredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      searchIngredients.push(
        `${meal[0][`strIngredient${i}`]} - ${meal[0][`strMeasure${i}`]}`
      );
    } else {
      break;
    }

    mealBox.innerHTML = "";
    searchMealBox.innerHTML = "";

    searchMealBox.insertAdjacentHTML(
      "beforeend",
      `<div class="food-container"> <div class="ingredients-container"> <h2> ${
        meal[0].strMeal
      }</h2> <h3> Origin: ${meal[0].strArea}</h3> <h3> Type of food: ${
        meal.strCategory
      } </h3> <ul class="ingredients">${searchIngredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("")} </ul> </div> <div class="food-image"> <img src="${
        meal[0].strMealThumb
      }" alt="Meal Image"> </div> </div> <div class="instructions-container"><h2> Instructions: </h2> <p> ${
        meal[0].strInstructions
      } </p> <div>`
    );
  }
};
