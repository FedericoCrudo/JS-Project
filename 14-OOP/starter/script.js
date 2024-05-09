'use strict';

const Person = function (firstName, birthYear) {
  //instancee properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // mai inserire metodi nel costruttore
  // andrebbe a crearea questa function per ogni oggetto e non è il massimo
  // this.calcAge = function () {
  //   return (2037 - this.birthYear);
  // }
};

//Dietro le quinte avvengono 4 fasi per creare l'istanza
// 1. Viene Creato object vuoto
// 2. Viene chiamata la funzione , this ={}
// 3. {} collegato al prototipo
// 4. la funzione restituirà automaticamente  l'object
const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('jack', 1975);

console.log(matilda, jack);
console.log(jonas instanceof Person);

console.log(Person.prototype);
//Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
// questo valore esiste grazie  alla 3 fase di creazione => "{} collegato al prototipo"
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
// questo perché il prototipo è associato alle varie instance non al costruttore Person
console.log(Person.prototype.isPrototypeOf(Person));

//possiamo definire anceh delle property all'interno  del nostro prototipo

Person.prototype.species = 'Home Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); // false

// Prototypal inheritance

console.log(jonas.__proto__);
// punterà al prototipo Object ovver il TOp della catena => infatti __proto__ null
console.log(jonas.__proto__.__proto__);

//prototype array;

const arr = [3, 2, 4, 5, 5, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
// object.prototype
console.log(arr.__proto__.__proto__);

// sapendo questo possiamo implementare nuovi meotodi o property
// è sconsigliato perché nelle nuove release di javascript
// potrebbero rilasciare un metodo con lo stesso nome, quindi il codice userà il nuovo metodo
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// qui possiamo vedere la prototypal chain del DOm tree
// 1 livello => HTMLHeadingElement
// 2 livello => HtmlElement
// 3 livello => Element
// 4 livello => Node
// 5 livello => EventTarget
const h1 = document.querySelector('h1');
console.dir(h1);

//funzione
//le funzione sono object quindi avranno prototipo
// console.dir(x => x * 2);

// Coding Challenge #1

const Car2 = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
const bmw = new Car('BMW', 120);
bmw.accelerate();
bmw.brake();

// ES6 Classes
// class expression
//no hoisting
//sono fist-class=> sono un tipo speciale di funzione
//vengono eseguite in strict mode
/* const PersonCl = class {

} */
//class declaration
class PersonCl {
  constructor(fullName, date) {
    this.fullName = fullName;
    this.date = date;
  }
  //saranno inserite all'interno del prototipo
  calcAge() {
    console.log(2037 - this.date);
  }
  get age() {
    return 2037 - this.date;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not full name`);
  }
  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log('Hey');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

/* 
  Getter and Setter
  ogni oggetto in js può avere questi metodi 
  queste proprietà  vengono chiamate Accessor properties(get,set)
  funzioni che ottengono e impostano un valore 
  questi metodi andranno a generare all'interno del prototipo:
  1. la funzione get age
  2. la  property age
*/

const account = {
  owner: 'federico',
  movements: [200, 100, 500, 10],

  get lastest() {
    return this.movements.at(-1);
  },
  set lastest(mov) {
    this.movements.push(mov);
  },
};
//in questo modo possiamo richiamare semplicemente la  property non una function
console.log(account.lastest);
//per passare effettivamente il value è necessario solo settare la property
account.lastest = 50;
// movimento aggiunto
console.log(account);

// Static Method
/* 
  metodi definiti a livello di constructor come Number.parseFloat(), Array.from();
  sono metodi che non vogliamo propagare a livello di prototipo 

*/
/* 


Person.hey = function () {
  console.log("hey");
}
ES6
static hey() {
  console.log("Hey");
}

*/

/* 
Person.hey();work
jonas.hey();  error
*/

/* 
  Object.create()
*/
const PersonProto = {
  calcAge() {
    console.log(2037 - this.date);
  },
  init(name, date) {
    this.name = name;
    this.date = date;
  },
};
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.date = 2002;

const sara = Object.create(PersonProto);
sara.init('Sarah', 1979);

/* 
  Coding Challenge 2
*/
class CarES6 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    console.log(this.speed / 1.6 + ' mi/h');
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const audi = new CarES6('audi', 180);
audi.accelerate();
audi.brake();
audi.speedUS;
audi.speedUS = 115.625;
console.log(audi);

/* 
  Inheritance Classes
*/

const PersonClass = function (name, date) {
  this.name = name;
  this.date = date;
};

PersonClass.prototype.calcAge = function () {
  console.log(2037 - this.date);
};

const Student = function (name, date, course) {
  //in questo modo sfruttermo  la funzione passando come object Student
  PersonClass.call(this, name, date);
  this.course = course;
};
//linking prototype
// è stato definito prima di altri prototype  perché andrebbe ad eliminare i metodi già inseriti
Student.prototype = Object.create(PersonClass.prototype);
// è sbagliato perché finirebbe per puntare allo stesso object PersonClass.prototype
// Student.prototype = PersonClass.prototype;
//
Student.prototype.introduce = function () {
  console.log(`My name is ${this.name} and i study ${this.course} `);
};
//è necessario per preservare la catena dei constructor
// poiché abbiamo copiano il prototipo da PersonClass
// è stato selezionato anche il costruttore di person
Student.prototype.constructor = Student;
const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();
console.dir(mike);

/* 
   Coding Challenge 3
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//link prototype completamente inutile
// volva dimostrare override  accelerate(non vero);
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('tesla', 220, 80);
tesla.chargeBattery(85);
tesla.accelerate();

console.log(tesla);

/* 
Inheritance Classes : Classes
*/
// in questo modo andrà a colleggare direttamente
// i prototipi senza doverlo fare manualmente
class StudentCl extends PersonClass {
  constructor(name, date, course) {
    // Person.call()
    //non sarà più necessario utilizzare la call
    //super è la funzione di costruzione della classe genitore
    // deve sempre essere eseguita prima del rest
    // questo perché questa super function è responsabile
    // della creazione della key this in questa sottoclasse
    super(name, date);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.name} and i study ${this.course} `);
  }
  calcAge() {
    console.log(`I'm ${2037 - this.date} years old`);
  }
}
//in questo scenario potremmo anche eliminare la super function
// e il dettaglio course , proprio perché si rifarebbe al costruttore originale
//quindi va definito un nuovo construttore solo nel caso vi siano campi in più
const martha = new StudentCl('Martha Jones', 2012, 'Computer');
martha.introduce();
martha.calcAge();

/* 
  Another info Class
*/

class Account {
  // 1. Pubblic fields(ALL Istances)
  locale = navigator.locale;
  //2. Private
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }
  //public interface
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdrw(val) {
    this.#movements.push(-val);
    return this;
  }
  requestLoan(val) {
    if (this.#approveLoan) {
      this.deposit(val);
      console.log('Loan Approved');
    }
  }
  //private method
  #approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdrw(-150);

console.log(acc1);
console.log(acc1.requestLoan());

/* 
  chaning methods
*/
acc1.deposit(300).deposit(500).withdrw(35).requestLoan(25000);
console.log(acc1);

/* 
  Coding Challenge #4
*/

class EVCl extends CarES6 {
  #chargeBattery;
  constructor(make, speed, chargeBattery) {
    super(make, speed);
    this.#chargeBattery = chargeBattery;
  }
  chargeBattery(chargeTo) {
    this.#chargeBattery = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#chargeBattery--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#chargeBattery
      }`
    );
    return this;
  }
}

const cupra = new EVCl('cupra', 120, 23);
console.log(cupra);
cupra
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(cupra);
cupra.speedUS;
