import * as model from './model';
import recipeView from './views/recipe';
import searchView from './views/search';
import resultView from './views/result';
import pagination from './views/pagination';
import bookmarkView from './views/bookmark';
import AddRecipe from './views/addRecipe';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) module.hot.accept();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const init = function () {
  recipeView.addHandlerRender(getRecipes);
  recipeView.handlerServings(controlServings);
  recipeView.handlerBookMarke(controlBookMark);
  searchView.searchHandler(controlSearchResults);
  pagination.handlerBtn(controlPagination);
  bookmarkView.render(model.state.bookMarks);
  AddRecipe.handlerUpload(controlAddRecipe);
};
init();

async function getRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Get Recipes
    recipeView.renderSpinner();
    resultView.update(model.paginationResult());
    await model.localRecipe(id);
    // Render Recipes
    recipeView.render(model.state.recipe);
    if (model.state.bookMarks) bookmarkView.update(model.state.bookMarks);
  } catch (error) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultView.renderSpinner();
    await model.recipeList(query);
    window.location.hash = model.state.recipe.id;
    resultView.render(model.paginationResult());
    pagination.render(model.state.search);
  } catch (error) {
    console.error(error);
    resultView.renderError(error);
  }
}

function controlPagination() {
  resultView.render(model.paginationResult(this._data.currentPage));
  pagination.render(model.state.search);
}

function controlServings(servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipe);
}
function controlBookMark() {
  model.addBookMark();
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookMarks);
}
async function controlAddRecipe(data) {
  try {
    AddRecipe.renderSpinner();
    await model.UploadRecipe(data);
    recipeView.render(model.state.recipe);
    AddRecipe.renderMessage();
    console.log(model.state.recipe);
    //Change id url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    bookmarkView.render(model.state.bookMarks);

    setTimeout(AddRecipe.toggleWindow(), 3500);
  } catch (error) {
    console.log(error);
    AddRecipe.renderError(error);
  }
}
