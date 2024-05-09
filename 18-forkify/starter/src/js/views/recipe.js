import View from './View';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _genericError = "We Couldn not find that recipe";
  _genericSuccess = "";
  _recipeBtn = document.querySelector('.recipe__info-buttons');


  addHandlerRender(fn) {
    ['hashchange', 'load'].forEach(el => {
      window.addEventListener(el, fn)
    });
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this._data.imageurl}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingtime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings minus">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings plus">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${!this._data.key ? 'hidden' : ''}">
          <svg class="">
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateIngredients).join('')}  
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`

  }
  _generateIngredients(ingredients) {
    return `<li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${new Fraction(ingredients.quantity)}</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ingredients.description}</span>
                        pasta
                      </div>
                    </li>`
  }
  handlerServings(fn) {
    this._parentElement.addEventListener("click", e => {
      const btn = e.target.closest('.btn--tiny');
      let count = this._data.servings;
      if (!btn) return;
      if (btn.classList.contains('plus')) count++
      else if (btn.classList.contains('minus')) count--
      if (count < 1) return;
      fn(count);

    })
  }
  handlerBookMarke(fn) {
    this._parentElement.addEventListener("click", e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      fn();

    })
  }
}
//esportiamo direttamnete l'oggetto e non l'intera classe
export default new RecipeView();
