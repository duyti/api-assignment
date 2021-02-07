const searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", () => {
    document.getElementById("search-result-block").innerHTML = "";
    document.getElementById("recipe-block").innerHTML = "";
    const searchKey = document.getElementById("search-input");
    if (searchKey.value != "") {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey.value}`)
            .then(response => response.json())
            .then(data => displayResults(data.meals))
    }
    else {
        showError("Write something");
    }
});

const displayResults = meals => {
    if (meals) {
        meals.forEach(meal => {
            showResult(meal.strMeal, meal.strMealThumb, meal.idMeal);
        })
    }
    else {
        showError("No matching meal name found");
    }
}

function showError(msg) {
    const errorBlock = document.createElement("div");
    const errorMsg = document.createElement("h2");
    errorBlock.className = "text-center";
    errorBlock.style = "color: red";
    errorMsg.innerHTML = msg;
    errorBlock.appendChild(errorMsg);

    addNewElement("search-result-block", errorBlock);
}

function showResult(mealName, mealImgUrl, mealId) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-4 mb-3";
    cardDiv.innerHTML = `<div id="${mealId}" class="card h-100" style="cursor: pointer;" onclick="displayRecipe(${mealId})">
                            <img src="${mealImgUrl}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h4 class="card-title">${mealName}</h4>
                            </div>
                        </div>`;
    addNewElement("search-result-block", cardDiv);
}

const displayRecipe = mealId => {
    document.getElementById("recipe-block").innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];

            const recipeCard = document.createElement("div");
            recipeCard.className = "card";
            recipeCard.innerHTML = `<div class="card-header">${meal.strMeal}</div>
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="">`;

            const cardBody = document.createElement('div');
            cardBody.className = "card-body";
            const oLists = document.createElement('ol');
            oLists.style = "list-style-type: upper-roman;";
            cardBody.innerHTML = `<h6 class="card-text">Ingredients :</h6>`;

            let i = 1;
            while (meal[`strIngredient${i}`] != "") {
                const ingredient = meal[`strMeasure${i}`] + " " + meal[`strIngredient${i}`];
                const list = document.createElement('li');
                list.innerText = ingredient;
                oLists.appendChild(list);
                i++;
            }
            cardBody.appendChild(oLists);
            cardBody.innerHTML += `<hr><h6 class="card-text">Method:</h6>
                                    <p class="card-text">${meal.strInstructions}</p>`;

            recipeCard.appendChild(cardBody);

            addNewElement("recipe-block", recipeCard);
        })

    document.documentElement.scrollTop = 0;
}

const addNewElement = (parentId, child) => {
    const parent = document.getElementById(parentId);
    parent.appendChild(child);
}


//  add EventListener from parent to all child