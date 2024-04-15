function Iterator(array) {
  let nextIndex = 0;
  return {
    next: function () {
      if (nextIndex < array.length) {
        return {
          value: array[nextIndex++],
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
}

const array = [1, 2, 3, 4, 5];
const arrayValue = Iterator(array);

console.log(arrayValue.next()); // { value: 1, done: false }
console.log(arrayValue.next()); // { value: 2, done: false }
console.log(arrayValue.next()); // { value: 3, done: false }
console.log(arrayValue.next()); // { value: 4, done: false }
console.log(arrayValue.next()); // { value: 5, done: false }
console.log(arrayValue.next()); // { value: undefined, done: true }


const array1 = [1, 2, 3, 4, 5];
const iterator1 = array[Symbol.iterator]();

console.log(iterator1.next()); // { value: 1, done: false }
console.log(iterator1.next()); // { value: 2, done: false }
console.log(iterator1.next()); // { value: 3, done: false }
console.log(iterator1.next()); // { value: 4, done: false }
console.log(iterator1.next()); // { value: 5, done: false }
console.log(iterator1.next()); // { value: undefined, done: true }


const obj = {
  [Symbol.iterator]() {
    let count = 0;

    return {
      next() {
        if (count < 5) {
          count += 1;
          return {value: count, done: false}
        } else {
          return {done: true}
        }
      }
    }
  }
}

const iterator2 = obj[Symbol.iterator]()
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.next())

for (const c of obj) {
  console.log("c: ", c)
}
// Can use Array.from(obj) too
console.log("spread: ", [...obj])
console.log("Array from: ", Array.from(obj))


function* fibonacciGenerator() {
  let current = 0;
  let next = 1;

  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

// Create an instance of the Fibonacci generator
const fibonacci = fibonacciGenerator();

// Generate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci.next().value);
}

// Output
// 0 1 1 2 3 5 8 13 21 34
