class SearchView {
  _parentEl = document.querySelector('.search');
  _searchBtnElement = document.querySelector('.search__btn');
  _searchInput = this._parentEl.querySelector('.search__field');
  getQuery() {
    return this._searchInput.value;
  }
  clear() {
    this._searchInput.value = '';
  }
  searchHandler(fn) {
    this._searchBtnElement.addEventListener('click', (e) => {
      e.preventDefault();
      fn();
      this.clear();
    });
  }
}
export default new SearchView();