// function gotcha
f2();

function f2() {
    console.log("first")
}

function f2() {
    console.log("Second")
}

const arr1 = [1,2,3];
const arr2 = [4,5,6];

// concat in arr1
arr1.push.apply(arr1, arr2);

console.log(arr1);
console.log(arr2);


console.log(Math.max.apply({}, arr1));


function f() {
    console.log(this);
}

let user = {
    g: f.bind({})
}

user.g();

// There is nothing call bind chaining
// Once bounded, can't be re-bounded

function f1() {
    console.log(this.name);
}

// The first bind permanently binds 'f' to {name: "AR"}
f1 = f1.bind({name: "AR"});

// Attempting to rebind 'f' to {name: "SS"}, but this doesn't change the binding
f1 = f1.bind({name: "SS"});

f1(); // Output: "AR"

var name1 = "haha";
const obj = {
    name1: "SS",
    arrowFunc: () => {
        console.log(this.name1);
    }
};

const newFunc = obj.arrowFunc.bind({name1: "AR"});
newFunc(); // haha -> arrowFunc -> no external binding




// polyfill for car

Function.prototype.myCall = function(obj, ...args) {
    if (!obj) return this(...args);
    obj = Object(obj);

    const fnSymbol = Symbol();
    obj[fnSymbol] = this;

    const result = obj[fnSymbol](...args);

    delete obj[fnSymbol];

    return result;

}

Function.prototype.myApply = function(context, args) {
    if (typeof this !== "function") throw new Error(`${this} is not callable.`);
    if (!Array.isArray(args)) throw new TypeError(`${args} is not properly passed.`);
    
    context = context || globalThis; // Use global object if context is not provided

    const fnSymbol = Symbol(); // Use a symbol to avoid potential property name conflicts
    context[fnSymbol] = this;  // Add the function as a temporary property

    const result = context[fnSymbol](...args); // Call the function with provided arguments

    delete context[fnSymbol]; // Remove the temporary property

    return result; // Return the result of the function call
};

Function.prototype.myBind = function(context, ...args) {
    if (!context) context = globalThis;

    context = Object(context);
    const funcSymbol = Symbol();
    context[funcSymbol] = this;

    return function(...newArgs) {
        const result = context[funcSymbol](...args, ...newArgs);
        delete context[funcSymbol];

        return result;
    }
}

function testCustomCallApply(abc) {
    console.log(this.name, abc);
}

testCustomCallApply.myCall({name: "SS"}, "is cute.");


const name1 = (x= 5) => {
     console.log("in arrow x: ", x)
}

function name2 (x = 5) {
    console.log("in func x: ", x)
}

name1(); // 5
name2(); // 5

name1(null); // null
name2(null); // null