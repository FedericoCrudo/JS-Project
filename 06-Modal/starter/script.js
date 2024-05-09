'use strict';

let modal = document.querySelector('.modal');
let buttonModal = document.querySelectorAll('.show-modal');
let overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');


for (let i = 0; i < buttonModal.length; i++) {
  buttonModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key == "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}







