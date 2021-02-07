const clog = console.log;
const searchKey = document.getElementById("search-box");
searchKey.addEventListener("keyup", () => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    // clog(meal);
                    showResult(meal.strMeal, meal.strMealThumb, meal.idMeal);
                })
            }
            else {
                clog("not found");
            }
        })

});

function showResult(mealName, mealImgUrl, mealId) {
    clog(mealName, mealImgUrl, mealId);
}


//  add EventListener from parent to all child