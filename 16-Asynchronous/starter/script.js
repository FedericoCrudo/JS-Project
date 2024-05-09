'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');
///////////////////////////////////////
// Esistono diversi modi per effettuare delle chiamate AJAX
// OLD SCHOOL  XMLHTTPRequest
// queste callback annidate prendono il nome di callback Hell
// rende il codice meno comprensibile a causa della struttura nidificata
//quindi in caso di bug sarà più difficile effettuare fix
//per risolvere tutto cio in ES6 è sono state introdotte le promises
/* function getCountryData(country) {
  //tipo di chiamata e url 
  console.log(country);
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener("load", function (e) {
    //questa property viene definita solo al terminte della chiamata 
    const [data] = JSON.parse(this.responseText);
    //render contry 1
    printCountry(data);
    const [neighbour] = data.borders;
    if (!neighbour) return;
    //second country 
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [response2] = JSON.parse(this.responseText);
      printCountry(response2, 'neighbour');
    })
  })
} */
btn.addEventListener('click', function () {
  getCountryData('italy');
});
//Promise
/* 
  si tratta di un oggetto che viene utilizzato come segnaposto per il risultato 
  futuro di operazione asincrone
  //Contenitore per un valore consegnato in modo asincrono
  grazie alle promises non dovremmo più fare affidamento ad eventi 
  e funzioni di callback per gestire il risultato 
  Inoltre, potremmo concatenare le promises per una serie di operazioni 
  asincrone,evitando le callback hell

*/
// con la funzione fetch possiamo definire ajax più complesse passando un set di options
// const request = fetch(`https://restcountries.com/v3.1/name/italy`);
// //pending
// console.log(request);

//Chaning Promises
//in questo scenario ogni then rappresenta la promises precedente
// quindi nel caso di un'altra chiamata sarà necessario definire
// nuovamente respone.json()
// function getCountryData(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //json è una funzione asincrona ,restituira una nuova promessa
//     // err => alert(err) non è proprio il massimo, possiamo tracciare gli errori
//     //indipendentemente da dove vengono generati con .catch alla fine
//     .then(response => {
//       //creiamo una eccezione custom nel caso in cui non venga restituito nulla
//       //questo perché il return response.json restituira una nuova promise anche
//       // anche se in errore,quindi entrera nello scenario successivo
//       if (!response.ok)
//         //interrompe immediatamente l'esecuzione
//         throw new Error("Country not found")
//       return response.json()
//     })
//     .then(data => {
//       printCountry(...data)
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     // err => alert(err) non è proprio il massimo, possiamo tracciare gli errori
//     .then(response => {
//       if (!response.ok)
//         //interrompe immediatamente l'esecuzione
//         throw new Error("Country not found")
//       return response.json()
//     })
//     .then(data => printCountry(...data, 'neighbour'))
//     // gli errori si propagano lungo la catena  fino a quando non vengono catturati
//     //error è un object effettivo , quindi possiamo creare degli errori custom con un constructor
//     //inoltre presente della property come message
//     .catch(err => {
//       console.log(`${err} 🧨`)
//       renderError(err.message);
//     })
//     //questa chiamata verrà effettuata sempre indipendentemente dall'esito della promises
//     .finally(() => {

//     })
// };
function getCountryData(country) {
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      printCountry(...data);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('Country not neightbour');
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found with Code'
      );
    })
    .then(data => printCountry(...data, 'neighbour'))
    .catch(err => {
      console.log(`${err} 🧨`);
      renderError(err.message);
    });
}

function getJson(url, errorMessage = 'Error') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(errorMessage);
    return response.json();
  });
}
function renderError(err) {
  countriesContainer.insertAdjacentText('beforebegin', err);
  countriesContainer.style.opacity = 0;
}
function printCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}</p>
  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
  <p class="country__row"><span>💰</span>${
    Object.values(data.currencies)[0].name
  }</p>
  </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
}

/* 
  Coding Challenge #1
*/

console.log(navigator);
// navigator.geolocation.getCurrentPosition(whereAmI, () => alert("Error coords"));

// function whereAmI(coords) {
//   const { latitude, longitude } = coords.coords;
//   fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.city.includes("Throttled")) throw new Error("Api Limit");
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error("Country not found");
//       return response.json();
//     })
//     .then(data => printCountry(...data))
//     .catch(err => console.log(err.message))
// }

/* 
Event Loop Example
*/
// console.log("TEst start");//1
// setTimeout(() => console.log("0 second"), 0);//5
// Promise.resolve("Resolved Promise").then(resp => console.log(resp))//3
// //questa promise andrà a ritardate la callback del setTimeout
// //la promises verrà risolta comunque immediatamente, pero il micro-task che contiene, richiedera molto tempo
// Promise.resolve("Resolved Promise1").then(resp => {
//   // for (let i = 0; i < 100000; i++) {
//   //   console.log(resp)
//   // }
// })//4

// console.log("test end");//2

/* 
  Build Promises
*/
// const promise = new Promise(function (resolve, reject) {
//   console.log("wait");
//   setTimeout(function () {
//     if (Math.random() >= 0.5)
//       resolve('You win ');
//     else
//       reject(new Error("You lost"))

//   }, 2000)
// })

// promise
//   .then(res => console.log(res)) // resolve
//   .catch(err => console.log(err)) //reject

// //Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('i wanted for  2 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i wanted for 1 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i wanted for 2 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i wanted for 3 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i wanted for 4 second');
//     return wait(1);
//   })

// navigator.geolocation.getCurrentPosition(position => {
//   console.log(position);
// }, err => alert(err))

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => {
    //   resolve(position);
    // }, err => reject(err))
    //equal
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(response => console.log(response))

/* 
  Coding #2
*/
function createImgage(pathImg) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = pathImg;
    image.addEventListener('load', function () {
      images.append(this);
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Issue Load Image'))
    );
  });
}

// createImgage('https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg')
//   .then(() => wait(2))
//   .then(() => {
//     image.style.display = "none";
//     return createImgage('https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg');
//   })
//   .then(() => wait(2))
//   .then(() => image.style.display = "none")
//   .catch(err => alert(err.message))

/* 
  Async/Await
  è un modo di scrivere promise,permettono di strutturare il codice in maniera più leggibile 
  permette di scrcivere codice asincrono in modo sincrono.
  bisogna definire async sulla function e definire await

*/
const whereAmIAsync = async function () {
  //await ferma l'esecuzione della decodifica a questo punto,
  // finché non riceverà una promise
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    //Reverse geocoding
    const reverseGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );
    const resGeo = await reverseGeo.json();
    if (resGeo.city.includes('Throttled')) throw new Error('Api Limit🧨');
    //Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${resGeo.country}`
    );
    if (!res.ok) throw new Error('Country not found');
    const data = await res.json();
    printCountry(...data);
    return `you are in ${resGeo.city}`;
  } catch (err) {
    renderError(err.message);
    //Reject promise
    throw err;
  }
};
console.log('1'); //1
/* whereAmIAsync()
  .then(city => console.log("2" + city))
  .catch(err => console.log("2" + err))
  .finally(() => console.log("three")); */
//questa soluzione non è ottimale perché si utilizza il vecchio sistema e il nuovo
//siccome il valore di ritorno sara una promise possiamo utilizzare async/await

(async function () {
  try {
    const response = await whereAmIAsync();
    console.log(response);
    console.log('2' + response);
  } catch (error) {
    console.log('2' + error);
  }
  console.log('3');
})();

/* 
  Running Promises In Parallel
*/

const getThreeCountris = async function (c1, c2, c3) {
  try {
    //in questo modo non verranno eseguire in serie non in parallelo
    // const [res1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
    // const [res2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [res3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([res1.capital, res2.capital, res3.capital]);
    //utilizziamo un metodo statico presente sul costruttore Promise per eseguire le chiamate in parallelo
    //nel caso anche solo una prommise venga rifiutata tutta la primise all sarà rifiutata
    const data = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c2}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(
      data.flatMap(el => {
        return el[0].capital;
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

getThreeCountris('portugal', 'canada', 'tanzania');

/*
Combinatori promises:All,Race,Allsettled and any
*/

//promise.race => riceve una serie di promise e restituisce anche una promessa
// la prima promise soddisfatta vince indipendentemnete che sia fullfill or rejected

(async function () {
  const res = await Promise.race([
    getJson(`https://restcountries.com/v3.1/name/italy`),
    getJson(`https://restcountries.com/v3.1/name/egypt`),
    getJson(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  //il risultato variera perché una promise puo essere più veloce ecc
  console.log(res);
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error('Request too long')), s * 1000);
  });
};
Promise.race([
  getJson(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(600),
])
  .then(resp => console.log(resp[0]))
  .catch(err => console.log(err));

//Promise.AllSettled => accetta una serie di promise,restituuira una serie di tutte le promesse
// non importa se sono state respinte o meno,similòe a Promise.all
// ma differisce pr il fatto che non andra mai in cortocircuito. Promise.all => prima falsa, tutta la promise sarà false
Promise.allSettled([
  Promise.resolve(),
  Promise.reject(),
  Promise.resolve(),
]).then(res => console.log(res));
//con all riceveremmo errore
Promise.all([
  Promise.resolve(),
  Promise.reject('Errore All'),
  Promise.resolve(),
])
  .then(res => console.log(res))
  .catch(erro => console.log(erro));

//Promise.any=> accetta una serie di promise,restituirà la prima promessa soddisfatta e ingora quelle rifiutate
Promise.any([
  Promise.reject(),
  Promise.resolve('prova'),
  Promise.resolve('nice'),
]).then(res => console.log(res));

async function LoadNPause2() {
  try {
    const data = await createImgage(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZAq08u4YaR0Jsu2CgeptdxC74y-9QEeFYEAb6YHP&s'
    );
    await wait(2);
    data.style.display = 'none';
    const data2 = await createImgage(
      'https://st.depositphotos.com/2762064/3514/i/600/depositphotos_35145403-stock-photo-downtown-toronto-at-night.jpg'
    );
    await wait(2);
    data2.style.display = 'none';
  } catch (error) {
    alert(error);
  }
}

async function LoadAllImg(arr) {
  try {
    const imgs = await Promise.allSettled(arr.map(el => createImgage(el)));
    imgs.forEach(el => el.value.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
}

LoadAllImg([
  'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true',
  'https://static4.depositphotos.com/1003326/319/i/450/depositphotos_3191160-stock-photo-blurry-bright-background.jpg',
  'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg',
]);

/*
Coding Challenge 3
*/
// createImgage('https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg')
//   .then(() => wait(2))
//   .then(() => {
//     image.style.display = "none";
//     return createImgage('https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg');
//   })
//   .then(() => wait(2))
//   .then(() => image.style.display = "none")
//   .catch(err => alert(err.message))

// const loadNPause = async function () {
//   try {
//     await createImgage('https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg');
//     await wait(2);
//     image.style.display = "none";
//     await createImgage('https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg');
//     await wait(2);
//     image.style.display = "none";
//   } catch (error) {
//     alert(error.message)
//   }

// }
// // loadNPause();

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(el => createImgage(el));
//     const imgEl = await Promise.all(imgs);
//     imgEl.forEach(el => el.classList.add('parallel')
//     )
//   } catch (error) {
//     console.log(error);
//   }

// }

// loadAll(['https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg', 'https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg', 'https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg']);
