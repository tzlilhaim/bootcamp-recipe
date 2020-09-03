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
