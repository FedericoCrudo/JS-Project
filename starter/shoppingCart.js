//Exporting module
console.log("exporting module");
//BLocking Code
// console.log("start fetching");
// await fetch('https://jsonplaceholder.typicode.com/users')
// console.log("finish fetching");

const shippingCost = 10;

export const cart = []
//in questo modo possiamo esportare la function
export const addToCard = function (prod, quantity) {
  cart.push({ prod, quantity });
  console.log(`${quantity} ${prod} added to cart`);
}


const totalPrice = 237;
const totalQuantity = 23;
// Esportazioni denominate 
export { totalPrice, totalQuantity as tq };

// Esportazioni predefinite
export default function (prod, quantity) {
  cart.push({ prod, quantity });
  console.log(`${quantity} ${prod} added to cart`);
}

