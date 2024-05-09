//importing module
//in realta non è necessario indicare l'estensione 
//viene eseguito prima il codice presente in shopping
//poi tutto il resto. I moduli devono essere nel global scope,quindi niente function o if ecc
// Possiamo importare più di un elemento,ovviamente deve essere esportato 
//possiamo cambiare i nomi in input
// import { addToCard, totalPrice as price, tq, cart } from "./shoppingCart.js";
// //quando importiamo tutti in un oggetto la prima lettera è maiuscola
// console.log("importing module");
// /* Non possiamo richiamare le varibili definite in altri moduli
// perché a differenza degli script standar ,i moduli vincolano 
// le variabili allo cope del modulo.Ora per usufruire di queste varibili
// è necessario effettuare un ulteriore export.
// Esistono due tipologie di export:
// 1.Esportazioni denominate => le più semplice 
// 2.Esportazioni predefinite
// */
// addToCard("Lego", 2);
// console.log(price, tq);
// cart.push("Ciao");
console.log("importing module");
// import * as ShoppingCart from "./shoppingCart.js";

// ShoppingCart.addToCard("lego", 2);
// console.log(ShoppingCart.totalPrice);
//predefinite
// verrà eseguitop prima tutto il codice del modulo e poi verrà importato
import add, { cart } from "./shoppingCart.js";

add("pizza", 2);
add("pizza", 2);
add("pizza", 2);
add("pizza", 2);
//non è una copia ma l'array principale , quindi sono connessi
console.log(cart);


/* 
Await 2022
è possibile utilizzare await fuori dalle funzioni asincrone
solo nei moduli.
In quessto modo però viene bloccata l'intera esecuzione del modulo,
*/
// const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await resp.json();
// console.log(data);
// console.log("test");



/*
  COMMONJS MODULES
  è un altro sitema di moduli in passato,
  non erano nativi del ling.
  AMD module
  CommonJS => utilizzati in js
  come in ES6 modules ogni file è un modulo
  */
//Funzionerà in nodejs
// export.addToCart = function (prod, quantity) {
//   cart.push({ prod, quantity });
//   console.log(`${quantity} ${prod} added to cart`);
// };

// //import
// const { addToCart } = require('./shoppingCart.js')


import cloneDeep from './node_modules/lodash-es/cloneDeep.js';


const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 }
  ],
  user: { loggedIn: true }
}
//non fa un deep clone
const stateClone = Object.assign({}, state);
const clone = structuredClone(state);
stateClone.user.loggedIn = false;
console.log(stateClone);
console.log(clone);
const stateDeepClone = cloneDeep(state);

console.log(stateDeepClone);


/* 
Parcel
dev dependencies => strumento di cui abbiamo bisogno
LOCALE=>npm i parcel --save-dev
GLOBAL=>npm i parcel -g
per costruire un'applicazione,ma non è un dipendenza che includiamo 
effettivamente nel nostro codice
parcel index.html 
non funzionerà perché i pacchetti sono installati localmente(esistono anche installazioni glbali)
*per installare globalmente è necessario aggiungere -g alla fine. In questo modo sarà disponibile da qualsiasi posizione nel computer, senza ricorrere ad npm
per utilizzarlo abbiamo due opzioni:
1.npx => applicazione integrata in npm =>  npx parcel .\index.html(comando standard)
2. NPM => con npm è possibile definire associare degli alias, da aggiungere nella sezione script del package,
per poter eseguire parcel
***avvia anche un server locale
Il risultato di parcel sarà una nuova cartella "Dist"
 contenente il codice da esportare in produzione
*/
//codice che solo parcel interpreta
// Hot module replacement
//Ricarica il modulo caldo e che ogni volta che cambiamo uno dei moduli
// attiverà una ricostruzione,come quella standard, ma il nuovo pacchetto modficato
// verrà iniettato nel browser senza innescare una ricarica della pagina, possiamo vedere il log della riga 35 
// che ad ogni refresh aumenta il numero di elementi
if (module.hot) {
  module.hot.accept();
}
// importare dei moduli speficando il path potremme essere complicato
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// Per questo in ogni modules bundler non è necessario specificare il percorso
import cloneDeep from 'lodash-es'

/*
Una volta termianti gli sviluppi è necessario costruire un budler finale
ovvero un  bundler compresso,quindi senza codice morte
comando definito all'interno del package => parcel build index.html
Ora in file sono stati compressi.

Polyfilling=> aggiungere method non presenti in vecchie versioni
Transpilling=> conversione a livello di sintassi  arrow function=> function expression oppire let a var prima di ES6


*/
// PArcel di occuperà di parsare il nostro codice per aver il massimo della compatibilità
//ovviametne con un preset-env 
/* 
  di fatto alcuni features potrebbero non essere convertite (find, promise.cc)
  per questo è necessario ricorrere al polyfilling => npm innstall core-js
  Il polyfilling si occupa di ricreare una fuunzione definita e renderla disponibile 
  nel caso di find e promise, babel si occuperà di aggiungere questi metodi  nell'object Array 
  Polyfiling in realtà ha aggiunto tutti i metodi mancati.
  Quindi per avere un bundle più piccolo è necessario definire solo quelli necessari
  */
//  Polyfiling in realtà ha aggiunto tutti i metodi mancati./funzionalità
//  Quindi per avere un bundle più piccolo è necessario definire solo quelli necessari
// importas tutti i metodi mancati di ES6
// import 'core-js/stable';
//possiamo specificare i metodi da importare
import 'core-js/stable/array/find.js';

// Polyfilling async function
import 'regenerator-runtime/runtime';