const request = require("request")

class RecipeBook {
  constructor() {
    this.recipes = {}
  }
  addRecipe(searchedIngredient, recipeData) {
    if (!this.recipes[searchedIngredient]) {
      this.recipes[searchedIngredient] = []
    }
    const recipe = new Recipe(
      recipeData.title,
      recipeData.ingredients,
      recipeData.thumbnail,
      recipeData.href,
      recipeData.strInstructions
    )
    this.recipes[searchedIngredient].push(recipe)
  }
  listRecipes() {
    return this.recipes
  }
  getIngredientRecipes(ingredient) {
    const recipes = this.recipes[ingredient]
    return recipes ? recipes : []
  }
  clearRecipeBook() {
    this.recipes = []
  }
}

class Recipe {
  constructor(title, ingredients, img, videoLink, instructions) {
    ;(this.title = title),
      (this.ingredients = ingredients),
      (this.img = img),
      (this.videoLink = videoLink),
      (this.instructions = instructions)
  }
}

const recipeBook = new RecipeBook()

const getRecipesData = function (ingredient, res) {
  const existingData = recipeBook.getIngredientRecipes(ingredient)
  const resMsg = { ingredient: ingredient, recipes: existingData }
  if (existingData.length) {
    res.send(resMsg)
  } else {
    request(
      `https://recipes-goodness.herokuapp.com/recipes/${ingredient}`,
      function (error, response, body) {
        let recipes = []
        if (error) {
          next(error)
        } else {
          const retreivedData = JSON.parse(response.body).results
          retreivedData.forEach((r) => recipeBook.addRecipe(ingredient, r))
          recipes = recipeBook.getIngredientRecipes(ingredient)
        }
        resMsg.recipes = recipes
        res.send(resMsg)
      }
    )
  }
}

module.exports = { getRecipesForIngredient: getRecipesData }
