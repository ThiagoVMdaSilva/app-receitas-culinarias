// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={ScaffoldLayout} title="Likes" titleTo="likes" buttonLabel="New Like" buttonTo="newLike" currentPage="recipes">
        <Route path="/likes/new" page={LikeNewLikePage} name="newLike" />
        <Route path="/likes/{id:Int}/edit" page={LikeEditLikePage} name="editLike" />
        <Route path="/likes/{id:Int}" page={LikeLikePage} name="like" />
        <Route path="/likes" page={LikeLikesPage} name="likes" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Recipes" titleTo="recipes" buttonLabel="New Recipe" buttonTo="newRecipe" currentPage="recipes">
        <Route path="/recipes/new" page={RecipeNewRecipePage} name="newRecipe" />
        <Route path="/recipes/{id:Int}/edit" page={RecipeEditRecipePage} name="editRecipe" />
        <Route path="/recipes/{id:Int}" page={RecipeRecipePage} name="recipe" />
        <Route path="/recipes" page={RecipeRecipesPage} name="recipes" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

