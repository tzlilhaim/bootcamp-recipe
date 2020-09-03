const express = require("express")
const router = express.Router()
const recipes = require("./recipes")

router.get("/sanity", function (req, res) {
  res.send("OK")
})

router.get("/recipes/:ingredient", function (req, res) {
    const ingredient = req.params.ingredient
    recipes.getRecipesForIngredient(ingredient,res)
  })

module.exports = router
