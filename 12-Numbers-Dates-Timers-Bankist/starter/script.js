'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Federico Crudo',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currentUser, existTimer;
let sortStatus = true;
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Exercise

/* containerApp.style.opacity = 1; */


createUsername();
btnLogin.addEventListener("click", (e) => {
  e.preventDefault()
  loginBank(inputLoginUsername.value, inputLoginPin.value);
});
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault()
  currentUser && transferMoney(inputTransferTo.value, inputTransferAmount.value);
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault()
  currentUser && deleteCustomer(inputCloseUsername.value, Number(inputClosePin.value));
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault()
  currentUser && requestLoan(Number(inputLoanAmount.value));
});

btnSort.addEventListener("click", (e) => {
  e.preventDefault()
  currentUser && printMovements(currentUser, sortStatus);
  sortStatus = !sortStatus;

})

function loginBank(usr, psw) {

  resetTimer();
  currentUser = accounts.find(element => element.username == usr && element.pin == psw)
  if (!currentUser) return;
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric", //long
    year: "numeric"
  }
  const actualDate = new Intl.DateTimeFormat(currentUser.locale, options).format(new Date());
  labelDate.textContent = actualDate;
  calculateBalance(currentUser);
  labelWelcome.textContent = `Good Day, ${currentUser.owner.split(" ").at(0)}!`
  containerApp.style.opacity = 1;
  inputLoginUsername.value = inputLoginPin.value = "";
  //delete focus
  inputLoginPin.blur();
  inputLoginUsername.blur();
}

function printMovements(acc, sort = false) {
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  containerMovements.innerHTML = '';
  movs.forEach((element, index) => {
    const displayDate = setDate(new Date(acc.movementsDates[index]), acc.locale);
    const typeTransaction = element > 0 ? "deposit" : "withdrawal";
    const template = `
    <div class="movements__row">
    <div class="movements__type movements__type--${typeTransaction}">${index++} ${typeTransaction}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${Math.abs(element).toFixed(2)} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', template);
  });
}
function setDate(datePassed, dateFormat) {
  const diff = Math.round(Math.abs(+datePassed - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff <= 7) return `${diff} day ago`;
  return new Intl.DateTimeFormat(dateFormat).format(datePassed);
}

function createUsername() {
  accounts.forEach((element) => {
    element.username = element.owner.split(" ").map(item => {
      return item.at(0);
    }).join("").toLowerCase();
  });

}

function calculateBalance(customer) {
  customer.balance = customer.movements.reduce((acc, item) => acc + item, 0)
  labelBalance.textContent = `${customer.balance} €`;
  printMovements(customer);
  calcDisplaySummary(customer);
}

function calcDisplaySummary(customer) {
  customer.deposits = customer.movements.filter((element => element > 0)).reduce((acc, element) => acc + element, 0);
  customer.withdrawals = customer.movements.filter(element => element < 0).reduce((acc, element) => acc + element, 0);
  labelSumIn.textContent = customer.deposits.toFixed(2) + '€';
  labelSumOut.textContent = Math.abs(customer.withdrawals).toFixed(2) + '€';
  const interest = customer.movements
    .filter(element => element > 0)
    .map(element => element * customer.interestRate / 100)
    .filter(element => element >= 1)
    .reduce((acc, element) => {
      return acc + element;
    }, 0).toFixed(2) + '€';
  labelSumInterest.textContent = interest;
}

function transferMoney(userTo, transferAmount) {
  resetTimer();
  transferAmount = Number(transferAmount);
  let transferTo = accounts.find(element => element.username == userTo);
  let validationAccountAndType = !typeof transferAmount == 'Number' || !transferTo || currentUser.username === userTo;
  if (currentUser.balance < transferAmount || transferAmount <= 0 || validationAccountAndType) return 0;

  // TRANSFER AND RECIVE
  transferTo.movements.push(transferAmount);
  currentUser.movements.push(-transferAmount);
  // ADD NEW DATE RECORD
  currentUser.movementsDates.push(new Date().toISOString());
  transferTo.movementsDates.push(new Date().toISOString());

  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();
  calculateBalance(currentUser);
}

function requestLoan(loanAmount) {
  resetTimer();
  if (!loanAmount || loanAmount < 0 || !currentUser) return 0;
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  setTimeout(() => {
    const loanValidation = currentUser.movements.some(mov => mov >= loanAmount * 0.1);
    loanValidation && currentUser.movements.push(loanAmount) && currentUser.movementsDates.push(new Date().toISOString());
    calculateBalance(currentUser);
  }, 3000);
}

function startLogOutTimer() {
  const tick = () => {
    let min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    let sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min} :${sec}`;
    if (time == 0) {
      clearInterval(timer);
      logout();
    }
    time--;
  }
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

function resetTimer() {
  if (existTimer) clearInterval(existTimer);
  existTimer = startLogOutTimer();
}

function deleteCustomer(usr, psw) {
  if (!currentUser.username === usr || !currentUser.pin === psw) return 0;
  let indexDelete = accounts.findIndex(element => element.username === usr);
  accounts.splice(indexDelete, 1);
  labelWelcome.textContent = `Log in to get started`
  containerApp.style.opacity = 0;
  inputCloseUsername.value = inputClosePin.value = "";
  //delete focus
  inputCloseUsername.blur();
  inputClosePin.blur();

}

function logout() {
  labelWelcome.textContent = `Log in to get started`
  containerApp.style.opacity = 0;
  inputCloseUsername.value = inputClosePin.value = inputLoanAmount.value = inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();
  inputLoanAmount.blur();
  inputCloseUsername.blur();
  inputClosePin.blur();
  currentUser = '';
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
//Conversion
console.log(Number('23'));
//piu pulito
console.log(+'23');
//Parsing
//Possiamo specificare la rappresentazione se in base 2 o 10 ecc

console.log(Number.parseInt('30px', 10));// 30
console.log(Number.parseInt('e30', 10));// NaN

console.log(Number.parseInt('2.5rem'));//2
console.log(Number.parseFloat('2.5rem'));//2.5

console.log(Number.isNaN(23)); //False
console.log(Number.isNaN(+'e23e')); //true
//non tiene conto dell'infinito lo riconosce come valido,meglio utilizzare isFinite
console.log(Number.isNaN(23 / 0)); //false


//Check if value is number
//non effettua type coercion                    
console.log(Number.isFinite(20));//true
console.log(Number.isFinite('20'));//false
console.log(Number.isFinite(+'20X'));//false
console.log(Number.isFinite(23 / 0));//false




//Math Operation

//radice quadrata 
console.log(Math.sqrt(25));
//esponente 
console.log(25 ** (1 /
  2));
//max value
console.log(Math.max(5, 18, 23, 11, 2));
//effettua la type coercion 
console.log(Math.max(5, 18, '23', 11, 2)); //23
//ma non il parsing 
console.log(Math.max(5, 18, '23e', 11, 2)); //NaN

//MIN uguale al max
// possiamo accedere anche a delle costanti presenti sull'object Math
console.log(Math.PI);

//Random function
console.log(Math.trunc(Math.random() * 6) + 1);

//function
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

//Rounding integers
console.log(Math.trunc(23.8)); //Rimuove tutti i decimali
//arrotonderà sempre all'intero più vicino 
console.log(Math.round(23.3));
console.log(Math.round(23.9));
//ceil
//arrotondati per eccesso 
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));
//floor
//arrotondati per difetto
//type coercion
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
// trunc vs floor
//funzionano  in egual modo solo con i numeri positivi
console.log(Math.trunc(23.3)); //23
// con i numeri negativi il rounding funziona al contrario
console.log(Math.floor(-23.3)); //-24

//Rouding decimals
//to fixed restituira sempre una stringa
//arrotonda in automatico
console.log((2.7).toFixed(0)); //3

/* 
  Remainder Operator

  */

const b2 = 22;

if (b2 % 2 === 0) {
  console.log("Numero pari");
} else {
  console.log("Numero dispari");
}


/* 
  Numeric Separators
*/
/* const diameter = 28746000000;
 */// solitamente questi numeri vengono rappresentati con una notazione più leggibile
// 287,460,000,00
const diameter = 287_460_000_000;

console.log(diameter);//28746000000 ignora underscore


/* 
  Work with bigint
  non possono essere mischiati con int
*/

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
// alcune volte potrebbe funzionare altre no
// si consiglia quindi di evitare operazione superiori al MAX SAFE
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);

//
console.log(2616165651661661661616666161178484n);
console.log(BigInt(2616165651661661661616666161178484));

console.log(2616165651661661661616666161178484n * 10000000n);

// Math.sqrt(16n) ERRORE

// 1 Exceptions: confronto
// possiamo effettuare confronti tra i numeri int e i numeri BigINt

console.log(25n > 5); //true
// Ovviamente false, perché con strict equality non esegue la type coercion.
console.log(25n === 25);
// 2 Exceptions: Concatenazione 
console.log(25n + "Ciao");

// Divisions
// con la divisione con bigint viene troncata la parte decimale
console.log(11n / 3n); // 3n



/* 
  Create Dates
*/

//Create Date
const data = new Date();
console.log(data);
//Parsing Date String 
console.log(new Date('2023-04-03T13:16:09.383Z'));
console.log(new Date('December 24, 2015')); //2015-12-23T23:00:00.000Z
console.log(new Date(account1.movementsDates[0]));

//Possiamo passare anche giorni, mese, anno ecc
console.log(new Date(2037, 10, 19, 15, 23, 5));//2037-11-19T14:23:05.000Z --- 11(novembre) perché si parte da 0
//javascript corregge in automatico il giorno 
console.log(new Date(2037, 10, 31)); // passsera da 31 novembre  a 1 dicembre visto che novembre non ha 31 giorni


// Working with date


const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); //giorno n del week Giovedi => 4
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
//possiamo ottenere anche una stringa formatta in base alla data fornita
console.log(future.toISOString());

//timestamp
// millisecondi trascorsi dal 1 gennaio 1970
console.log(future.getTime());
console.log(new Date(2142253385000));

// timestamp corrente 
console.log(Date.now());

// definire anno
future.setFullYear(2040);

console.log(future);

console.log(new Date());

/*
  Operation with Date
*/
// diff data

const future2 = new Date(2037, 10, 19, 15, 23);
console.log(+future2);

const dayPassed = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);//day


console.log(dayPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));


//Internationalizing Date (Intl)

const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", //long
  year: "numeric"
}

console.log(new Intl.DateTimeFormat('pt-PT', options).format(now));

// senza dover indicare il dateformat è possibile recuperare quest'utlimo 

const locale = navigator.language;
console.log(locale);


/* 
Internationalizing Number
*/
const num = 388874.23
const options2 = {
  style: "unit", //unit, percentuale,currency(dobbiamo definirla)
  unit: "celsius",
  currency: 'EUR',
  // useGrouping: false //rimuoverà i separatori 
}
console.log('US:', new Intl.NumberFormat('en-US', options2).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options2).format(num));
console.log('Syria:', new Intl.NumberFormat('ar-SY', options2).format(num));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options2).format(num));


/* 
 setTimeout setInterval
*/

setTimeout(() => console.log("Hello"), 3000);
//possiamo passare dei parametri 
setTimeout((ing1, ing2) => console.log(ing1, ing2), 3000, 'pasta', 'verdura');
//possiamo cancellare il timeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(ing1, ing2), 3000, ...ingredients);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
//è possibile passare dei parametri come con setTimeout
// const intervalTest = setInterval()
/* //setInterval
setInterval(() => {
  const now = new Date();
  console.log(now);
}, 1000); */


