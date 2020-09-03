const renderer = new Renderer()

$("#search-bar>button").on("click", function () {
  const $input = $("#ingredient-input")
  if ($input.val().length) {
    $.get(`/recipes/${$input.val()}`, function (data) {
      $input.val(null)
      if (data.recipes.length) {
        renderer.renderRecipes(data)
      } else {
        renderer.renderEmptyState(data.ingredient)
      }
    })
  } else {
    renderer.renderAlertedInput()
  }
})

$("#recipes-container").on("click", ".meal-img-container", function () {
  const firstIngredient = $(this)
    .closest(".recipe")
    .find("li.ingredient:first")
  alert(firstIngredient.text())
})
