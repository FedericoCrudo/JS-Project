'use strict';

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const button = document.querySelector('button');
const textarea = document.querySelectorAll('textarea');
let valueChanged;
button.addEventListener("click", function () {
  console.log(textarea);
  let camelCase = textarea.value.trim().split("\n");
  console.log(camelCase);
  for (const [key, item] of camelCase.entries()) {
    let [first, last] = item.toLowerCase().trim().split("_");
    last = last.replace(last[0], last[0].toUpperCase());
    valueChanged = (first + last).padEnd(20, " ") + "✅".repeat(key + 1);
    console.log(valueChanged);
  }
});


const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+ _Delayed_Arrival; hel7439299980; fao93766109; 12: 05 + _Departure; fao93766109; lis2323639855; 12: 30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
/* _Delayed_Departure; fao93766109; txl2133758440; 11: 25 +
  _Arrival; bru0943384722; fao93766109; 11: 45 +
    _Delayed_Arrival; hel7439299980; fao93766109; 12: 05 +
      _Departure; fao93766109; lis2323639855; 12: 30 */



let remarke = flights.trim().split("Delayed");
let tmp;
for (const item of remarke) {
  tmp = item.split(';');
  for (const itemspecific of tmp) {
    tmp = itemspecific.trim().replace("+", "");
    console.log(tmp);

  }
}



// BIND Lessons 10
const greet = greeting => name => console.log(`${greeting}${name}`);

greet("Hey")(" Luca");



const addTax = (rate, value) => value + value * rate;
const addVat = addTax.bind(null, 0.23);


const callFunction = (rate = 0.23) => value => value + value * rate;
console.log(callFunction()(100));







