'use strict';

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [92, '🔶 Yellow card'],
]);

/* Gli array posso utilizzare i metodi
--> Keys()
--> entries()
--> Values()
Gli Object utilizzano : 
--> Object.values
--> Object.entries
--> Object.Keys
 */
// 1.
const events = new Set([...gameEvents.values()]);
console.log(events);
// 2.
/* gameEvents.delete(64);
console.log(gameEvents); */
// 3.
let maxMinute = [...gameEvents.keys()].pop();

console.log(`An Event Happened,on average,every ${maxMinute / gameEvents.size} minutes`);
for (const [key, item] of gameEvents.entries()) {
  const half = key < 45 ? "First" : "Second";
  console.log(`[${half} Half] ${item}`);
}

