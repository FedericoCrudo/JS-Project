let budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spedingLimits = {
  jonas: 1500,
  matilda: 100,
};

const addBudget = function (value, description, user = "jonas") {
  user = user.toLowerCase();
  const lim = spedingLimits?.[user] ?? 0;
  if (value > lim) return 0;
  budget.push({ value: -value, description, user });

};

addBudget(10, 'Pizza 🍕');
addBudget(100, 'Going to movies 🍿', 'Matilda');
addBudget(200, 'Stuff', 'Jay');


console.log(budget);

let check = function () {
  let lim = 0;
  budget = budget.map(el => {
    lim = spedingLimits?.[el.user] ?? lim;
    if (el.value < -lim) el.limit = 'Limit';
    return el;
  })
};
check();

console.log(budget);

let bigExpenses = function (limit) {
  let output = '';
  output = budget.filter(el => el.value <= -limit).map(res => `${res.description.slice(-2)} / `).join('').slice(0, -2);
  console.log(output);
};

bigExpenses(10)

