function add(...args) {
    let storage = args;

    function helper(...args2) {
        storage.push(...args2);

        return helper;
    }

    helper.valueof = function() {
       return storage.reduce((a, b) => a + b, 0)
    }

    helper[Symbol.toPrimitive] = function() {
       return storage.reduce((a, b) => a + b, 0);

    };

    helper.value = helper.valueof;
    // this.value = helper.valueof;

    return helper;
}
console.log(add(1,2,3).value() === 6)
console.log(add(1,2)(4).value() === 6)
console.log(add(1,2) + 3)


function curry (fn) {
    let funcLength = fn.length;

    let helper = function(...args) {
        if (funcLength <= args.length) {
            return fn(...args);
        } else {
            let temp = (...args2) => {
                return helper(...args, ...args2);
            }

            return temp;
        }
    }

    return helper;
}

function sum (a, b, c, d, e) {
    return a + b + c + d + e;
}


const curriedSum = curry(sum);


console.log(curriedSum(1,2,3,4,5))

console.log(curriedSum(1)(2)(3)(4)(5))





// Infinite Currying

function add(a) {
    if (a === undefined) return 0;
    return function(b) {
        console.log(b)
        if (!b) return a;
        else return add(a + b);
    }
}

console.log(add(2)(3)(4)(5)())


// convert func(2,3,4,5) to fun(2)(3)(4)(5)

function returnCurriedFunc(funct) {
    return function inner(...args) {
        if (funct.length <= args.length) return funct(...args);
        else {
            // not called but returned..called on next iteration
            return function(...next) {
                return inner(...next, ...args);
            }
        }
    }
}


const sum = (a, b, c) => a + b + c;
const curriedSum1 = returnCurriedFunc(sum);
console.log(curriedSum1(100)(20)(30));


const a = (a) => {

}

console.log(a.length) // 1


const _ = Symbol("placeholder");

function curry(fn) {
    return function inner (...args) {
        const completedArgs = args.length >= fn.length && !args.slice(0, fn.length).includes(_);

        if (completedArgs) {
            return fn(...args);
        } else {
            return function(...newArgs) {
                const mergedArgs = args.map(arg => (arg === _ && newArgs.length ? newArgs.shift() : arg)).concat(newArgs)
                console.log("mergedArgs: ", mergedArgs)
                return inner(...mergedArgs)
            }
        }
    }
}

function add(a, b, c) {
    return a + b + c;
  }
  
  const curriedAdd = curry(add);
  
//   console.log(curriedAdd(1)(2)(3));           // Output: 6
//   console.log(curriedAdd(1, 2)(3));           // Output: 6
//   console.log(curriedAdd(1)(_, 3)(2));        // Output: 6
//   console.log(curriedAdd(_, 2)(1)(3));        // Output: 6
  console.log(curriedAdd(_, _, 4)(_, 3)(1));     // Output: 6