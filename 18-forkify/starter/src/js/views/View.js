import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(recipe) {
    if (!recipe || (Array.isArray(recipe) && recipe.length === 0)) return this.renderError();
    //this._data farà riferimento al recipe,che proviene dal model, quindi nel caso dovessimo modificare alcune property verranno modificate anche sul model
    this._data = recipe;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(recipe) {
    this._data = recipe;
    const newMarkup = this._generateMarkup();
    //conversione string => dom object
    //Virtual Dom, non è presente all'interno della pagina 
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDom.querySelectorAll('*')];
    const curElements = [...this._parentElement.querySelectorAll('*')];
    newElements.forEach((el, i) => {
      const current = curElements[i];
      if (!el.isEqualNode(current) && el.firstChild?.nodeValue.trim() != '') {
        current.textContent = el.textContent;
      }
      if (!el.isEqualNode(current))
        [...el.attributes].forEach(attr => {
          current.setAttribute(attr.name, attr.value);
        })
    }
    );



  }
  _clear() {
    this._parentElement.innerHTML = ''
  }
  renderSpinner() {
    const template = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }
  renderError(err = this._genericError) {
    const template = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${err}</p>
  </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }
  renderMessage(err = this._genericSuccess) {
    const template = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${err}</p>
  </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }
}