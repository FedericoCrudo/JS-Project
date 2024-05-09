'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnsScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const operationSlider = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotConainer = document.querySelector('.dots');
const slides = document.querySelectorAll('.slide');
let curSlide = 0;

init();
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button scrolling
btnsScrollTo.addEventListener('click', e => {
  //posizione  di x elemento
  const s1coord = section1.getBoundingClientRect();
  console.log(s1coord);
  //indica la posizone all'interno della viewport
  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  // per vedere la dimensioni della viewport
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //in questo scenario il risultato varia in base alla posizione che abbiamo all'interna della pagina
  // questo perché il  calco che fa con getBounding fa riferimento alla distanza dalla viewport
  // se scrolliamo fino alla piena visibilità del buttom avremmo un risultato diverso .-
  // window.scrollTo({
  //   left: s1coord.left,
  //   top: s1coord.top,
  //   behavior: 'smooth'
  // })
  window.scrollTo(s1coord.left + window.scrollX, s1coord.top + window.scrollX);
  //metodo moderno
  // section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation

/* navLink.forEach(element => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionTo = document.querySelector(this.getAttribute("href"));
    sectionTo.scrollIntoView({ behavior: "smooth" })
  })
}); */

//alternative Event Delegation (Capture Targe Bubbling)
//  facciamo riferimento al contenitore padre per targettare i vari click
//molto più efficiente
// viene ultizzato anche nel caso in cui vengano aggiunti nuovi elementi nel dom
// quindi per evitare errori, si utilizza il contenitore padre poiché i figli non sono stati ancora caricati
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const sectionTo = document.querySelector(e.target.getAttribute('href'));
  sectionTo?.scrollIntoView({ behavior: 'smooth' });
});

operationSlider.addEventListener('click', function (e) {
  const button = e.target.closest('.btn');
  if (!button) return;
  const nextElement = document.querySelector(
    `.operations__content--${button.dataset.tab}`
  );
  const activeElement = document.querySelector('.operations__content--active');
  if (activeElement === nextElement) return;
  const tabActive = document.querySelector('.operations__tab--active');
  activeElement.classList.remove('operations__content--active');
  nextElement.classList.add('operations__content--active');
  tabActive.classList.remove('operations__tab--active');
  button.classList.add('operations__tab--active');
});
//nel caso si voglia rimuovere l'evento
//è necessario associare la nuova funziona (bind) ad una variabile
// diversamente ad ogni evento restituira una nuova funziona e quindi sarà impossibile rimuovere l'evento
const over = handleHover.bind(0.6);
const out = handleHover.bind(1);

// // nav.addEventListener("mouseover", handleHover.bind(0.6));
nav.addEventListener('mouseover', over);
// //handleHover.bind => function(e){} con this = al parametro passato nel bind;
// // nav.addEventListener("mouseover", handleHover.bind(0.6));
nav.addEventListener('mouseout', out);

const height = Number.parseFloat(getComputedStyle(nav).height);
/* window.addEventListener("scroll", function (e) {
  if (this.scrollY >= section1.getBoundingClientRect().top + this.scrollY) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}) */
const obsOptions = {
  //se non definito, predera come riferimento tutta la viewport
  root: null,
  //percentuale di intersezione in cui verra chiamato  la callback observer
  // threshold: 0.1
  //possiamo passare anche un array per specificare le soglie che invocheranno la callback
  threshold: [0],
  rootMargin: `-${height}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
const section = document.querySelectorAll('.section');

//revealing
const revealingElement = new IntersectionObserver(revealingScroll, {
  root: null,
  threshold: [0.2],
});
section.forEach(el => revealingElement.observe(el));

//Lazy loading images

const loadingImages = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
const imageLazy = document.querySelectorAll('.lazy-img');
imageLazy.forEach(el => loadingImages.observe(el));

//Slider

btnRight.addEventListener('click', nextNew);
btnLeft.addEventListener('click', prevNew);
dotConainer.addEventListener('click', clickDot);
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextNew();
  e.key === 'ArrowLeft' && nextPrev();
});

function nextNew() {
  if (curSlide >= slides.length - 1) curSlide = 0;
  else curSlide++;
  slideMove(curSlide);
  addActiveDot(curSlide);
}
function prevNew() {
  if (curSlide <= 0) curSlide = slides.length - 1;
  else curSlide--;
  slideMove(curSlide);
  addActiveDot(curSlide);
}

function slideMove(slide) {
  slides.forEach(
    (el, i) => (el.style.transform = `Translate(${(i - slide) * 100}%)`)
  );
}

function clickDot(e) {
  if (!e.target.classList.contains('dots__dot')) return;
  const [...child] = this.children;
  child.forEach((el, i) => {
    if (!(el === e.target)) return;
    slideMove(i);
    curSlide = i;
    addActiveDot(i);
  });
}

function addActiveDot(slide) {
  const [...allDots] = dotConainer.children;
  allDots.forEach((el, i) => {
    if (el.classList.contains('dots__dot--active') && i != slide) {
      el.classList.remove('dots__dot--active');
    } else if (slide === i) el.classList.add('dots__dot--active');
  });
}

// document.addEventListener("keydown", function (e) {
//   if (e.key === 'ArrowRight') btnRight.click();
//   e.key === 'ArrowLeft' && btnLeft.click();
// })

// // //dot
// dotConainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains('dots__dot')) {
//     addClassDot(e.target.dataset.slide);
//     slideMove(e.target.dataset.slide);
//     curSlide = e.target.dataset.slide;
//   }
// })

/* FUNCTIONS */
function init() {
  createDot();
  slideMove(0);
  addActiveDot(0);
}

// function addClassDot(slide) {
//   const dots = document.querySelectorAll('.dots__dot');
//   const dotActive = document.querySelector(`.dots__dot[data-slide="${slide}"`);
//   dotActive.classList.add('dots__dot--active');
//   dots.forEach(el => {
//     if (el.classList.contains('dots__dot--active') && el !== dotActive) el.classList.remove('dots__dot--active')
//   })

// }

//Create Dot
function createDot() {
  slides.forEach((_, i) => {
    dotConainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

// function slideMove(slide) {
//   console.log(slide);
//   slides.forEach((el, i) => {
//     el.style.transform = `translateX(${(i - slide) * 100}%)`;
//   });
// }
// function nextSlide() {
//   console.log(curSlide);
//   if (curSlide >= slides.length - 1) curSlide = 0;
//   else curSlide++;
//   slideMove(curSlide);
//   addClassDot(curSlide);
// }
// function prevSlide() {
//   if (curSlide <= 0) curSlide = slides.length - 1;
//   else curSlide--;
//   slideMove(curSlide);
//   addClassDot(curSlide);

// }

function lazyLoad([entry] = entries) {
  console.log(entry.isIntersecting);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
  loadingImages.unobserve(entry.target);
}

function revealingScroll(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  revealingElement.unobserve(entry.target);
}

function obsCallback(entries) {
  const [entry] = entries;
  console.log(entry.isIntersecting);
  if (entry.isIntersecting) return nav.classList.remove('sticky');
  nav.classList.add('sticky');
}

function handleHover(e) {
  if (!e.target.closest('.nav__link')) return;
  let siblings = [...nav.children].filter(el => el != navLinks);
  let total = [...siblings, ...navLink];
  total.forEach(el => (el.style.opacity = el != e.target ? this : ''));
}

// ///////////////////////////////////////
// // Selecting, Creating, and Deleting Elements
// /*
// // Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// ///////////////////////////////////////
// // Styles, Attributes and Classes

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes

// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes
// logo.classList.add('prova');
// // Don't use
// logo.className = 'jonas';
// console.log(logo.className);
//  */

// const h1 = document.querySelector('h1');
// /* const mouseHover = function () {
//   alert("Ciao")
//   console.log(this);
//   // h1.removeEventListener('mouseenter', mouseHover);
// }; */
// /* h1.addEventListener('mouseenter', mouseHover)
// h1.removeEventListener('mouseenter', mouseHover);  */// possiamo rimuoverlo anche dopo non per forza all'interno event

// //metodo vecchio
// /* h1.onmouseenter = function () {
//   h1.style.color = "red"
// }; */

// // AddeventListener è migliore consente di aggiungere più Eventi allo stesso tempo
// // possiamo rimuovere un gestore di eventi

// /*
//   Event Bubbing and Capturing
// */
// /*
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;
// console.log(randomColor());
// Target & Bubbling phase
// target== elemento effettivo del clickk
//currentTarget = target a cui è associato l'evento
//guarda scenario CONTAINER
// target=nav link
//current= nav link  == this keyword
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   //  possiamo evitare anche la propagazione dell'evento Bubbling
//   // verrà colorato solo l'emento nav__link e non gli elementi padre
//   // e.stopPropagation();
// })
// // clicando sul button features è stato triggerato tutto il contenitore
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// }, true) // con l'aggiunta di questo parametro a true ascolteremo gli eventi in fase di capturing invece del bubbling
//  */
// /*
//   Event Delegation
// */

// /*
//   DOM Traversing
// */
// //child
// /* console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// //solo per i figli diretti
// console.log(h1.children);
// h1.firstElementChild.style.color = "red";
// //parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
//  */
// //seleziona  header più vicino allìelemento h1
// /* h1.closest('.header');

// //siblings
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(element => {
//   console.log(element);
//   if (element !== h1) element.style.transform = 'scale(0.5)'
// });
//  */

// /*
//  The Intersection Observer API
//   consente al nostro codice di osservare le modifiche
//    con  cui un determinato elemento di destinazione
//   interseca un altro elemento o al modo in cui
//   interseca la viewport;
//   scrollando  verso il  basso/alto.
// */
// const obsOptions2 = {
//   //se non definito, predera come riferimento tutta la viewport
//   root: null,
//   //percentuale di intersezione in cui verra chiamato  la callback observer
//   // threshold: 0.1
//   //possiamo passare anche un array per specificare le soglie che invocheranno la callback
//   //0 => distanza dalla viewport 0% sia all'inizio che alla fine
//   //1=> 100% prestare attenzione perche la sezione potrebbe essre più grande del 100%,quindi non entra,section1 è troppo grande
//   threshold: [0],
//   rootMargin: "-90px"
// }
// const header2 = document.querySelector('.header');
// const observer = new IntersectionObserver(obsCallback, obsOptions2);
// observer.observe(header2);

// function obsCallback(entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return nav.classList.add("sticky");
//    nav.classList.remove("sticky");
// }

// /*
//   Lifecycle DOM Event
//   il primo evento che avviene all'interno di una pagina web è
//   DOM content loaded => generato dal documento non appena  html è stato completamente  parsato
//   il che significa  che html è stato scaricato e convertito nel DOM tree
//   Inoltre tutti gli script devono essere scaricati ed eseguiti prima
//   che possa verirficarsi l'evento di caricamento del contenuto

// */
// //possiamo ascolta l'evento di caricamento del contenuto
// //questo evento non aspetta il caricamento di immagini e altre risorse esterne
// //caricare solo html e javascript
// // non abbiamo bisogno di inserire il nostro  codice all'interno di questo evento
// // questo perché lo script tag , che importa effettivamente javascript, si trova
// // alla fine del corpo html,quindi sarò l'ultima cosa che richiamerà

// document.addEventListener("DOMContentLoaded", function (e) {
//   console.log("Html parsedd and Dom tree built", e);
// })

// //Load Event
// //attivato da window, una volta terminato il caricamento di altre
// //risorse come immagini e risorse  esterne (Css file)

// window.addEventListener("load", function (e) {
//   console.log("Page Fully Loaded", e);
// })

// //Before unload Event
// //questo evento permette di targettare l'uscita dell'utente
// // chiudendo la finestra del nostro sito o ricaricando la pagina
// // é molto invasiva, va limitato l'utilizzo solo in casi di compilazione
// // di un form o quando scrive un post sul blog ecc. Quindi solo nel caso in qui stia
// // effettuando delle operazioni che potrebbero portare una perdita di dati
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   //viene inserito per convenzione  ma non cambia il messaggio
//   //verrà visulizzato sempre il solito, indipendentemente dal valore
//   e.returnValue = ""
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   //  possiamo evitare anche la propagazione dell'evento Bubbling
//   // verrà colorato solo l'emento nav__link e non gli elementi padre
//   // e.stopPropagation();
// })

// const test1 = document.querySelector('.nav__links');
// const child = test1.querySelectorAll('li');
// const children = test1.children;
// const li = document.createElement('li');
// li.textContent = 'Prova';
// test1.append(li);

// console.log(child);
// console.log(children);
// console.log(test1);
