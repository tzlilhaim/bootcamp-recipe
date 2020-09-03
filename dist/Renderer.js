
class Renderer {
    constructor() {
      this.view = {
        $recipesContainer: $("#recipes-container"),
        $recipeTemplate: $("#recipe-template"),
        $showingResultsHeader: $("#showing-results-header")
      }
    }
    getTemplatedHTML($template, data) {
      const source = $template.html()
      const template = Handlebars.compile(source)
      const newHTML = template({ data })
      return newHTML
    }
  
    renderRecipes(recipes) {
        console.log(recipes)
      this.view.$recipesContainer.empty()
      const newHTML = this.getTemplatedHTML(
        this.view.$recipeTemplate,
        recipes.recipes
      )
      if (this.view.$recipeTemplate.hasClass("empty")) {
        this.view.$recipesContainer.removeClass("empty")
      }
      this.view.$recipesContainer.append(newHTML)
  
      this.view.$showingResultsHeader.text(`Found ${recipes.recipes.length} recipes with ${recipes.ingredient}:`)
    }
    renderAlertedInput() {
      const $input = $("#search-bar>input")
      const $alertIcon = $("#search-bar>i")
      $input.addClass("alerted")
      $alertIcon.addClass("alerted")
      setTimeout(function () {
        $input.removeClass("alerted")
        $alertIcon.removeClass("alerted")
      }, 3000)
    }
    renderEmptyState(ingredient){
        alert(`Couldn't find any recipes with ${ingredient}`)
    }
}