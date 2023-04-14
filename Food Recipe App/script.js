const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
let searchInputTxt = document.getElementById('search-input');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentNode.classList.remove('showRecipe');
})

function getMealList() {
    searchInputTxt.value = searchInputTxt.value.trim();
    const BASE_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt.value}`;

    fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                mealList.innerHTML = '';
                data.meals.forEach((meal) => {
                    mealList.innerHTML += `
                    <div class="meal-item" id="${meal.idMeal}">
                <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
                    `
                });
            } else {
                mealList.innerHTML = 'Sorry, we didn\' t find any meal!';
                mealList.classList.add('notFound');
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function getMealRecipe(e) {
    e.preventDefault();

    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentNode.parentNode;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
            .then((res) => res.json())
            .then((data) => {
                mealRecipeModal(data.meals);
            })
    }
}

function mealRecipeModal(meal) {
    meal = meal[0];
    mealDetailsContent.innerHTML = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
      <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `

    mealDetailsContent.parentNode.classList.add('showRecipe');
}
