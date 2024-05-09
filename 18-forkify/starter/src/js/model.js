import { async } from "regenerator-runtime";
import { API_URL, KEY, RESULT_FOR_PAGE } from './config.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: "",
    result: [],
    resultForPage: RESULT_FOR_PAGE,
    currentPage: 1,
  },
  bookMarks: JSON.parse(localStorage.getItem('Bookmarks')) ? [...JSON.parse(localStorage.getItem('Bookmarks'))] : [],
  currBookMark: 0,
}
const createRecipeObject = function (recipe) {
  return {
    "cookingtime": recipe.cooking_time,
    "id": recipe.id,
    "imageurl": recipe.image_url,
    "ingredients": recipe.ingredients,
    "publisher": recipe.publisher,
    "servings": recipe.servings,
    "sourceurl": recipe.source_url,
    "title": recipe.title,
    ...(recipe.key && { key: recipe.key })
  }
}
export const localRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);
    if (state.bookMarks.some(el => el.id === id)) state.recipe.bookmarked = true
    else state.recipe.bookmarked = false


  } catch (error) {
    throw error;
  }

}
export const recipeList = async function (search) {
  try {
    state.search.query = search;
    state.search.currentPage = 1;
    const data = await AJAX(`${API_URL}/?search=${search}&key=${KEY}`);
    state.search.result = data.data.recipes.map(el => {
      return {
        "id": el.id,
        "imageurl": el.image_url,
        "publisher": el.publisher,
        "title": el.title,
        ...(el.key && { key: el.key })
      }
    })
    state.recipe = createRecipeObject(data.data.recipes[0]);
  } catch (error) {
    throw error;
  }

}

export const paginationResult = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const min = (page - 1) * state.search.resultForPage;
  const max = (page * state.search.resultForPage);
  return state.search.result.slice(min, max);
}
export const updateServings = function (servings) {
  state.recipe.ingredients.forEach(el => {
    el.quantity = (el.quantity / state.recipe.servings) * servings;
  })
  state.recipe.servings = servings;
}

export const addBookMark = function () {
  const checkIncludesArray = state.bookMarks.findIndex(el => el.id == state.recipe.id);
  if (checkIncludesArray) {
    state.recipe.bookmarked = true;
    state.bookMarks.push(state.recipe);
  } else {
    state.recipe.bookmarked = false
    state.bookMarks.splice(checkIncludesArray, 1)
  }
  localStorage.setItem('Bookmarks', JSON.stringify(state.bookMarks));
}

export const UploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(el => el[0].startsWith('ingredient') && el[1] !== '')
      .map(el => {
        const ingArr = el[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) throw new Error("Wrong Ingredient");
        const [quantity, unit, description] = ingArr
        return { quantity: quantity ? quantity : null, unit: unit ? unit : null, description };
      });
    const recipe = {
      "cooking_time": +newRecipe.cookingTime,
      "image_url": newRecipe.image,
      ingredients,
      "publisher": newRecipe.publisher,
      "servings": newRecipe.servings,
      "source_url": newRecipe.sourceUrl,
      "title": newRecipe.title
    }
    const resp = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(resp.data.re);
    addBookMark();
  } catch (error) {
    throw error;
  }


}



