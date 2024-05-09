import View from './View';
class AddRecipe extends View {
  _parentElement = document.querySelector('.upload');
  _form = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _genericError = "No bookmarks yet. Find a nice recipe and bookmark it ";
  _genericSuccess = 'Recipe was successfully uploaded';
  constructor() {
    super();
    this.handlerForm();
    this.handlerCloseForm();
  }

  handlerForm() {
    this._btn.addEventListener("click", e => {
      const btn = e.target.closest('.nav__btn--add-recipe');
      if (!btn) return;
      this.toggleWindow();
    })
  }
  handlerCloseForm() {
    [this._btnClose, this._overlay].forEach(el => {
      el.addEventListener("click", this.toggleWindow.bind(this))
    })
  }
  handlerUpload(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(e.currentTarget)]);
      handler(data);
    })
  }
  toggleWindow() {
    this._form.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
}

export default new AddRecipe();
