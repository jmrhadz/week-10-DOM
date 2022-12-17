//class Recipe
class Recipe {

    //Name, Ingredients -> properties
    constructor(name, ingredients){
        this.name = name;
        this.ingredients = ingredients;
    }

}

//class Meal (Monday Lunch, Tuesday Dinner, etc)
class Meal{

    //id, name
    constructor(id, time, dayOfTheWeek){
        this.id = id;
        this.time = time;
        this.day = dayOfTheWeek;
        //array of recipes
        this.recipes = [];

    }
    
    //method: addRecipe
    addRecipe(recipe){

        //add argument to recipes array
        this.recipes.push(recipe);

    }

    //method: deleteRecipe
    deleteRecipe(recipe){

    //find index of argument in recipes array
        let index = this.recipes.indexOf(recipe);
    //remove recipe from recipes array
        this.recipes.splice(index,1);

    }
}

function alert(message){
    let main = document.getElementById('main')
    let container = document.getElementById('container')
    let alertDiv = document.createElement('div')
    alertDiv.className = "alert alert-warning alert-dismissible fade show"
    alertDiv.setAttribute('role','alert');
    alertDiv.innerHTML = `<strong>Oops!</strong> It seems that you're missing some important information. <strong>${message}</strong>`
    let btn = document.createElement('button');
    btn.className = 'btn-close';
    btn.setAttribute('data-bs-dismiss','alert');
    btn.setAttribute('aria-label','Close')
    alertDiv.appendChild(btn)
    main.insertBefore(alertDiv,container)
}


//array ot meals
let meals = [];
//initialize meal id
let mealId = 0;

//Clear All button
let btn = document.getElementById("clear-button");
    let mealDiv = document.getElementById("meals");
    btn.addEventListener('click', (e)=>{
        console.log("Clearing Meal Table")
        clearElement(mealDiv);
    })


//onClick
//id, action
function onClick(id, action){

    //get element by id
    let el = document.getElementById(id);
    //add click listener, pass in action argument
    el.addEventListener('click', action);
    //return element
    return el;

}

//add click listener for new-team button:
onClick("new-Meal", () => {
    let mealTime = getValue("new-Meal-time")
    let mealName = getValue("new-Meal-name")
    if(mealTime && mealName){
        //add new instance of Meal to meals array
        meals.push(new Meal(mealId++, mealTime , mealName));
            //pass in an incrementing meal id and getValue function with new meal time and day
        //draw DOM
        drawDOM();
    }else if(!mealName && !mealTime){
        alert("Both meal fields are blank.")
    }else if(!mealName){
        alert("Which day of the week?")
    }else if(!mealTime){
        alert("Which meal of the day?")
    }

})
    

//getValue
function getValue(id){

    //id
    //return get element.value
    return document.getElementById(id).value;
}

//draw DOM
function drawDOM(){

    //get meals div element from html
    let mealDiv = document.getElementById("meals");

    //clearElement
        //meal div
    clearElement(mealDiv);

    //iterate through meals array
    for(meal of meals){
        console.log(meal)
        //createMealTable
            //Meal
        let card = document.createElement('div');
        let cardBody = document.createElement('div');
        card.className = 'card bg-dark'
        cardBody.className = 'card-body'
        let table = createMealTable(meal);
        //create title, give it Meal's name
        let title = document.createElement("h2");
        title.innerHTML = `${meal.day}'s ${meal.time}`;
        title.className='text-light px-3 pt-4 pb-0'
        //append createDeleteMealButton to table
            //Meal
        table.appendChild(createDeleteMealButton(meal));
        //append title to mealDiv
        card.appendChild(title);
        //append team table to mealDiv
        card.appendChild(cardBody)
        cardBody.appendChild(table);
        mealDiv.appendChild(card)
        //iterate through recipes array
        for(recipe of meal.recipes){
            //createRecipeRow
                //meal, table, recipe
            createRecipeRow(meal, table, recipe);
        }
    }
}


//createMemberRow
    //meal, table, recipe
function createRecipeRow(meal, table, recipe){

    //insert table row at position 2
    let row = table.insertRow(2);
    //insert cell at position 0 for recipe name
    let recipeName = row.insertCell(0).innerHTML = recipe.name;
    //insert cell at position 1 for recipe ingredients
    let recipeIngredients = row.insertCell(1).innerHTML = recipe.ingredients;
    //insert cell at position 2 to append createDeleteRowButton
        //meal, recipe
    let recipeButton = row.insertCell(2);
    recipeButton.appendChild(createDeleteRowButton(meal, recipe));

}

//createDeleteRowButton
    //meal, recipe
function createDeleteRowButton(meal, recipe){
    
    //create button
    let btn = document.createElement('button');
    //add class name for bootstrap
    btn.className = 'btn btn-danger form-control';
    //add button's text
    btn.innerHTML = 'Delete';
    //add onclick action
    btn.onclick = () => {

        //find index of current recipe
        let index = meal.recipes.indexOf(recipe);
        //delete recipe from array
        meal.recipes.splice(index,1);
        //draw DOM
        drawDOM();

    }

    //return button
    return btn;

}

//createDeleteMealButton
    //meal
function createDeleteMealButton(meal){
    
    //create button
    let btn = document.createElement('button');
    //add class name for bootstrap
    btn.className = 'btn btn-danger form-control';
    //add button's text
    btn.innerHTML = 'Delete Meal'
    //add onclick action
    btn.onclick = () => {
        //find index of current meal
        let index = meals.indexOf(meal);
        //delete meal from array
        meals.splice(index,1);
        //draw DOM
        drawDOM();
    }

    //return button
    return btn;

}

//clearElement
    //element
function clearElement(element){

    //while there's a first child
    while(element.firstChild){
    //remove first child
        element.removeChild(element.firstChild);
    }

}


//createMealTable
    //meal
function createMealTable(meal){
    //create table
    let table = document.createElement('table');
    //set table class for bootstrap
    table.className = 'table table-dark table-striped';
    //create Row at position 0
    let row = table.insertRow(0);

    //create name column as table header
    let nameColumn = document.createElement('th');
    //give it a name
    nameColumn.innerHTML = meal.day;
    //append name column to row
    row.appendChild(nameColumn);

    //create ingredients column as table header
    let ingredientsColumn = document.createElement('th');
    //give it a name
    ingredientsColumn.innerHTML = meal.time;
    //append ingredients column to row
    row.appendChild(ingredientsColumn);

    //create button column for styling continuity
    let buttonColumn = document.createElement('th');
    //leave it blank
    buttonColumn.innerHTML = '';
    //append button column to row
    row.appendChild(buttonColumn);

    //create form row at position 1 for recipe input
    let form = table.insertRow(1);

    //create table header for name
    let nameTh =  document.createElement('th');
    //create input for name
    let nameInput = document.createElement('input');
    //set input id using template literal of meal.id
    nameInput.setAttribute('id',`name-input-${meal.id}`);
    //set input type as text
    nameInput.setAttribute('type', 'text');
    //set input class for bootstrap
    nameInput.setAttribute('class','form-control');
    //set placeholder
    nameInput.setAttribute('placeholder','Recipe Name');
    //append input for name to table header for name
    nameTh.appendChild(nameInput);

    //create table header for ingredients
    let ingredientsTh = document.createElement('th');
    //create input for ingredients
    let ingredientsInput = document.createElement('input');
    //set input id using template literal of meal.id
    ingredientsInput.setAttribute('id',`ingredients-input-${meal.id}`);
    //set input tpe as text
    ingredientsInput.setAttribute('type', 'text');
    //set input class for bootstrap
    ingredientsInput.setAttribute('class','form-control');
    //set placeholder
    ingredientsInput.setAttribute('placeholder','Ingredients');
    //append input for ingredients to table header for ungredients
    ingredientsTh.appendChild(ingredientsInput);

    //create table header for button
    let buttonTh = document.createElement('th');
    //createNewRecipeButton
        //meal
    let btn = createNewRecipeButton(meal);
    //append button to table header for button
    buttonTh.appendChild(btn);
    
    //append table header for name to form row
    form.appendChild(nameTh);
    //append table header for ingredients to form row
    form.appendChild(ingredientsTh);
    //append table header for button to form row
    form.appendChild(buttonTh);

    //return table
    return table;
}

//createNewRecipeButton
    //meal
function createNewRecipeButton(meal){

    //create button
    let btn = document.createElement('button');
    //set class for bootstrap
    btn.className = 'btn btn-success form-contol';
    //set button text to create
    btn.innerHTML = 'Add Recipe'
    //set onclick
    btn.onclick = () => {
        //push new instance of Recipe to recipes array
            //getValue
                //name-input-meal.id, ingredients-input-meal.id
        meal.recipes.push(new Recipe(getValue(`name-input-${meal.id}`),getValue(`ingredients-input-${meal.id}`)))
        //draw DOM
        drawDOM();
    }

    //return button
    return btn;

}
