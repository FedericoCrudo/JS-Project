import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _genericError = 'No recipes Found';
  _parentElement = document.querySelector('.pagination');
  __curPag = 0;

  _generateMarkup() {
    const numPages = Math.ceil(this._data.result.length / this._data.resultForPage);
    this._clear();
    this.__curPag = this._data.currentPage;
    if (numPages === 1) return '';
    if (this.__curPag === 1) {
      const template = `
       <button class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${++this.__curPag}</span>
      </button>`
      return template;
    }
    if (this.__curPag === numPages) {
      const template = `
       <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${--this.__curPag}</span>
      </button>`
      return template;
    }


    const template = `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this.__curPag - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
    <span>Page ${this.__curPag + 1}</span>
    </button>`
    return template;
  }
  handlerBtn(fn) {
    this._parentElement.addEventListener("click", e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      if (button.classList.contains('pagination__btn--prev')) this._data.currentPage--
      else this._data.currentPage++;
      console.dir(fn);
      fn.call(this);
    })
  }
}

export default new PaginationView();