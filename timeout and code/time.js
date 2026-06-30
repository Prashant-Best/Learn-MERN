console.log(1);
console.log(2);

setTimeout(() => {
  console.log(3);
}, 3000);

setTimeout(() => {
  console.log(4);
}, 1000);

Promise.resolve().then(() => {
  console.log(5);
});

setTimeout(() => {
  console.log(6);
}, 2000);

Promise.resolve().then(() => {
  console.log(7);
});

console.log(8);
console.log(9);
