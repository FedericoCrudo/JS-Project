import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _genericError = 'No recipes Found';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(el) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
    <a class="preview__link  ${el.id === id ? "preview__link--active" : ''} " href="#${el.id}">
      <figure class="preview__fig">
        <img src="${el.imageurl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${el.title}</h4>
        <p class="preview__publisher">${el.publisher}</p>
        <div class="preview__user-generated ${!el.key ? 'hidden' : ''}">
        <svg class="">
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      </div>
    </a>
  </li>`
  }
}

export default new ResultView();