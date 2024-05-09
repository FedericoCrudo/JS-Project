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
let currentUser;
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
  currentUser = accounts.find(element => element.username == usr && element.pin == psw)
  if (!currentUser) return;
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth()}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const displayDate = `${day}/${month}/${year}`
  labelDate.textContent = displayDate;
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
    const date = new Date(acc.movementsDates[index]);
    const year = date.getFullYear();
    const month = `${date.getMonth()}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const displayDate = `${day}/${month}/${year}`
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
  if (!loanAmount || loanAmount < 0 || !currentUser) return 0;
  const loanValidation = currentUser.movements.some(mov => mov >= loanAmount * 0.1);
  console.log(loanValidation);
  loanValidation && currentUser.movements.push(loanAmount) && currentUser.movementsDates.push(new Date().toISOString());
  calculateBalance(currentUser);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

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















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); */

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; */

/////////////////////////////////////////////////

/* let arr = [' a', 'b', 'c', 'd', 'e'];
//SLICE --> NON CAMBIA Array Original
//copia array princiaple, selezione elementi.
console.log(arr.slice(2)); // da 2 fino alla fine dell'array
console.log(arr.slice(2, 4)); // da 2 a 4(non incluso)
console.log(arr.slice(-2)); //ultimi due elemeneti
console.log(arr.slice(-1));//ultimo elemento
console.log(arr.slice(1, -2)); //da posizione 1(B) fino alla fine(C) tranne gli ultimi 2(d,e)
/* let arr = [' a', 'b', 'c', 'd'];
//SPLICE --> CAMBIA Array Original
//per rimuovere elementi da array principale
console.log(arr.splice(2)); // [ 'c', 'd'];
console.log(arr);// [' a', 'b',]
arr.splice(-1) //rimuove ultimo elemento array originale.
console.log(arr);// [' a']
// [' a', 'b', 'c', 'd']
arr.splice(1, 2) //partendo della posizione 1, rimuovera da posizione 1 a 2;
console.log(arr); // ['a','d']


//Reverse modifica array originale
arr = [' a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());


//CONCAT  Unire piu array  NON muta array originale
const letters = arr.concat(arr2);

//JOIN
crea un nuovo array


//The new "at" methods
const arr3 = [23, 11, 64];
console.log(arr3[0]);
//NEW ⬇️⬇️⬇️
console.log(arr3.at(0));
// getting lasta elemtt of array
console.log(arr3[arr3.length - 1]);
console.log(arr3.splice(-1)[0]);
//NEW
console.log(arr3.at(-1)); */



//Looping Foreach 
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const item of movements) {

  item > 0 && console.log(`Deposito di: ${item}`);
  item < 0 && console.log(`Prelievo di: ${Math.abs(item)}`);
}

// Foreach :! Le  istruzioni brack and continue non funzionano

movements.forEach((element, index, array) => {
  console.log(index);
  console.log(array);
  element > 0 && console.log(`Deposito di: ${element}`);
  element < 0 && console.log(`Prelievo di: ${Math.abs(element)}`);
});


//forEach  Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach((element, index, arr) => {
  console.log(element);
  console.log(index);
  console.log(arr);
});
 */

//Manipolazione DOM





// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate = null) {
  const bothData = [...dogsJulia.slice(1, -2), ...dogsKate];
  bothData.forEach((el, i) => console.log(`Dog number ${i} is an ${el >= 3 ? 'adult' : 'puppy'}, and is ${el} years old`))
}

checkDogs(julia, Kate)

//MAP 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsConverted = movements.map(element => element * eurToUsd);
console.log(movementsConverted);



//Filter

const deposits = movements.filter((element => element > 0));
const withdrawals = movements.filter(element => element < 0);
console.log(deposits);
console.log(withdrawals);


//Reduce

/* 
  Reduce 
  Primo parametro ->Accumulatore 
*/
const BalanceAccount = movements.reduce((acc, element, index, arr) => {
  return acc + element;
}, 0);
console.log(BalanceAccount);

// Maximum value /*  */
let pool = [11, 22, 445, 300, 100];
let test = pool.reduce((acc, element) => {
  acc = acc <= element ? element : acc;
  return acc;
}, pool[0])

console.log(test);





///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


let dogHuman;
let averageDogHuman;

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

function calcAverageHumanAge(ages) {
  const averageHumanAge = ages.map(el => el <= 2 ? el * 2 : el * 4 + 16);
  const less18HumanAge = averageHumanAge.filter(el => el >= 18);
  const vaerageHumanAge = less18HumanAge.reduce((acc, el, i, arr) => acc + el / arr.length, 0);
  console.log(vaerageHumanAge);
}


///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);
// function calcAverageHumanAge(ages) {
//   let averageDogHuman = ages.
//     map(age => age <= 2 ? age * 2 : age * 4 + 16)
//     .filter(age => age >= 18)
//     .reduce((acc, age, _, array) => acc + age / array.length, 0);

//   return averageDogHuman;
// }
/* Find Method 
 utilizzato per recuparare dati da un array in base a delle conditions ben definite 
 a differenza di filter:
 1. restituisce il primo elemento trovat
 2. non restistuire l'array ma l'elemento stesso
 */

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);


/* FindIndex Method
  uguale al find method solo che restituisce  l'indice dell'elemente che soddisfa
  le condizioni definite
 */

// let indexDelete = accounts.findIndex(element => element.username === usr);

/*
  Some & Every Method
*/
// SOME
console.log(movements);
//true
console.log(movements.includes(-123));
//true 
/*
Con include possiamo verificare solo l'uguaglianza 
Some permette di verifica in base ad un condizione che andiamo
a definire.
⬇️⬇️⬇️ */

// const anyDeposit = movements.some(mov => mov > 0);
//almeno un element maggiore di 1500
const anyDeposit = movements.some(mov => mov > 1500);
console.log(anyDeposit);

//Every
// restituisce true solo se tutti gli elementi soddisfano la condizione

const everyDeposit = movements.every(mov => mov > -651);
console.log(everyDeposit);

/* 
Flat && FlatMap
estrae tutti gli array annidati.
non modifica originale.
Flat => per nidificazioni superficiali 1 livello
anche se è possibile indicare il livello di profondità come argomento.
FlatMap => nidificazioni solo di un livello.
*/
const att2 = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(att2.flat());
const att2Deep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(att2Deep.flat());

const accountMovements = accounts.map(element => element.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);

//FlatMap
console.log(accounts.flatMap(element => element.movements).reduce((acc, mov) => acc + mov, 0));


/* 
 SOrting Array
 default A-z / 1-infinito
 MUTA ARRRAY ORIGINALE
 esegue il sorting in base alla stringhe non al number effettivo
*/
//ex String
const owners = ['jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

const numberTest = [8, 5, 4, 2, 9, 1];
console.log(numberTest.sort());
/* 
  come possiamo notare nell'esempio seguente, non effettua ordinamento il base al valore numerico
  ma considera il tutto come stringa 
  -130, -400,-650,1300,200,3000,450,70
  considera il segno meno
  poi ordina 1(130),4(400),6(650)
*/
console.log(movements);

console.log(movements.sort());

//Possiamo risolvere il problema passando un callback
//Return < 0 A,B (keep order)
//Return > 0 B,A (switch order)
//Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;

})
console.log(movements);
//Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
})
console.log(movements);
//semplificata
movements.sort((a, b) => a - b)
console.log(movements);


/* 
Creating and Filling Array

*/

const x = new Array(7);
console.log(x);// Creera  elementi vuoti di lunghezza pari all'argomento
//utilizzare map non servità a niente 
console.log(x.map(el => 5));

/*  
  l'unico metodo che possiamo utilizzare è fill
  se viene indicato solo un argument riempità l'intero array
  con il secondo argument possiamo definire l'indice di partenza per fillare gli elementi \
*/
x.fill(1);
console.log(x);//[1,1,1,1,1,1,1]

//utilizzare il costruttore e il from ⬇️⬇️⬇️
/* 
  Array.From
  fa riferimento al costruttore 
  USE CASE: DATA PREPARATION
*/

const y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(y);
//100 Lanci casuali dadi 
const testData = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * (6 - 1 + 1) + 1));
console.log(testData);

//Utlizziamo from anche nel caso di una NodeList => querySelector('p');
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI.map(element => element.textContent.replace('€', '')));
// semplificato
const movementsUI2 = Array.from(document.querySelectorAll('.movements__value'), el => el.textContent.replace('€', ''));
console.log(movementsUI2);
//Array Method Practice
const totalAmountBank = accounts.flatMap(mov => mov.movements).filter(mov => mov > 0).reduce((acc, item) => acc + item);
console.log(totalAmountBank);


// Count depositi con almeno 1000 
/* const countDeposit = accounts.flatMap(mov => mov.movements).filter(mov => mov >= 1000).length;
console.log(countDeposit); */

//Utilizzando reduce
const countDeposit = accounts.flatMap(mov => mov.movements).reduce((acc, curr) => curr >= 1000 ? ++acc : acc, 0);
console.log(countDeposit);
//3

const sumDepositWithDrawal = accounts.flatMap(mov => mov.movements).reduce((acc, cur) => {
  /*  cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur); */
  acc[cur > 0 ? "deposits" : "withdrawals"] += cur;
  return acc;
}, { deposits: 0, withdrawals: 0 });
console.log(sumDepositWithDrawal);

//4

const convertString = (str) => {
  const exepection = ["a", "an", "the", "but", "or", "on", "in", "with"];
  const title = str.toLowerCase();
  const converted = title.split(' ').map(element => {
    return !exepection.includes(element) ? element.at(0).toUpperCase() + element.slice(1) : element
  })
  console.log(converted);
}

convertString("ciao sono a federico piacere di conoscerti");



///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
//1
dogs.forEach(element => {
  element.recommendedFood = Number((element.weight ** 0.75 * 28).toFixed(2));
});
console.log(dogs);
//2
const sarahDogs = dogs.find(element => element.owners.includes('Sarah'));
sarahDogs && console.log(`Sara dogs is eating too ${sarahDogs.curFood > sarahDogs.recommendedFood ? "much" : 'little'}`);
//3
const ownersEatTooMuch = dogs.filter(element => element.curFood > element.recommendedFood).map(element => element.owners).flat();
const ownersEatTooLittle = dogs.filter(element => element.curFood < element.recommendedFood).map(element => element.owners).flat();
console.log(ownersEatTooMuch, ownersEatTooLittle);
//4
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too little!`);
//5
console.log(dogs.some(element => element.curFood == element.recommendedFood));
//6
const checkEating = element => element.curFood > element.recommendedFood * 0.90 && element.curFood < element.recommendedFood * 1.10;
console.log(dogs.some(checkEating));
//7
const dogsEatingOkay = dogs.filter(checkEating);
console.log(dogsEatingOkay);
//8
//a -b => crescente 
// b - a => decrescente
const shallowCopy = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(shallowCopy);
