window.onload = function() {
    let searchBar = document.getElementById("search");
    let container = document.getElementsByClassName("afterSearch")[0];
    let recipe = " ";

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            // console.log(data);

            const html = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="details('${meal.idMeal}')">
            <h2>${meal.strMeal}</h2>
            `;
            
            document.getElementById('randomTile').innerHTML = html;
        });

        let searchBtn = document.getElementById("searchBtn");
        searchBtn.onclick = () => {
            recipe = searchBar.value;
            searchBar.value = '';
            fetchRecipe();
        };
    

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            recipe = searchBar.value;
            searchBar.value = '';
            fetchRecipe();
        }
    });

    function fetchRecipe() {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe}`)
        .then((res) => res.json())
        .then((data) => displayData(data));
    }

    function displayData(inputData){
        container.innerHTML = '';
    
        if (inputData.meals) {
            inputData.meals.forEach(meal => {
                container.innerHTML += `<img src="${meal.strMealThumb}" alt="recipe image" onclick="details('${meal.idMeal}')">
                <h2>${meal.strMeal}</h2>`;
            });
        } else {
            container.innerHTML = `<p>No meals found</p>`;
        }
    }

    fetchRecipe();
}


function details(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(detail => {
        let meal = detail.meals[0]
        // console.log(meal)
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() { 
          modal.style.display = "none";
        }
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        var ingredients = document.getElementById("ingredients")
        modal.style.display = "block";
        modalImg.src = meal.strMealThumb;
        captionText.innerHTML = meal.strMeal;
        ingredients.innerHTML = `
                <h3>Ingredients</h3>
                <ul>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>${meal.strIngredient6}</li>
                </ul>
            </div>
        </div>
        `;
        
    })
}