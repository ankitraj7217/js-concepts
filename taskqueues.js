console.log('Script start');

// Schedule first macrotask
setTimeout(() => {
  console.log('setTimeout 1 start');

  // Add a microtask within the macrotask
  Promise.resolve().then(() => {
    console.log('Microtask during setTimeout 1');
  });

  console.log('setTimeout 1 end');
}, 0);

// Schedule second macrotask
setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

// Add initial microtasks
Promise.resolve().then(() => {
  console.log('Microtask 1');
}).then(() => {
  console.log('Microtask 2');
});

console.log('Script end');

// Script start
// script.js:27 Script end
// script.js:22 Microtask 1
// script.js:24 Microtask 2
// script.js:5 setTimeout 1 start
// script.js:12 setTimeout 1 end
// script.js:9 Microtask during setTimeout 1
// script.js:17 setTimeout 2
