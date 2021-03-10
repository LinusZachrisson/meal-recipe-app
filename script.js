let randomizeBtn = document.getElementById("randomizeBtn");
let mealBox = document.getElementById("mealBox");

randomizeBtn.addEventListener("click", function(){

    fetch( `https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(respone => respone.json())
    .then(data => {

        console.log(data);

        createRandomMeal(data.meals[0]);

    });
});

const createRandomMeal = (meal) =>{
    console.log(meal);
    const ingredients = []

    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }

        mealBox.innerHTML = "";

        mealBox.insertAdjacentHTML("beforeend",`<div class="food-container"> <div class="ingredients-container"> <h2> ${meal.strMeal}</h2> <h3> Origin: ${meal.strArea}</h3> <h3> Type of food: ${meal.strCategory} </h3> <ul class="ingredients">${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")} </ul> </div> <div class="food-image"> <img src="${meal.strMealThumb}" alt="Meal Image"> </div> </div> <h2> Instructions: </h2> <p> ${meal.strInstructions} </p>`);
    }
}