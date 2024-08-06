function func1() {
    const Person = (name) => {
        console.log(arguments[0], new.target);
        this.name = name; // TypeError: Cannot set property 'name' of undefined
    }

    Person(2);
}

new func1(5);


// "use strict";

function nFunc() {
    console.log(this);
}

const func = () => {
    console.log(this);
}

nFunc();
func();


// //
// The main difference between arrow functions and regular functions in JavaScript lies in how they handle 
// the `this` keyword and whether they have their own `arguments` object and `new.target` reference. 
// This difference impacts how constructors are defined and used. Let's explore in detail:

// **Regular Functions:**

// 1. **`this` Binding:** Regular functions have dynamic `this` binding, which means the value of `this` is determined by how the function is called. It can vary depending on the context in which the function is invoked: global scope, object method, event handler, etc.

// 2. **`arguments` Object:** Regular functions have their own `arguments` object, which is an array-like object containing all the arguments passed to the function.

// 3. **`new.target` Reference:** Inside a regular function, the `new.target` property refers to the constructor function that was used to instantiate the current instance, if any. This property is `undefined` if the function was not called with the `new` keyword.

// 4. **Constructor Usage:** Regular functions can be used as constructors by invoking them with the `new` keyword. When a regular function is called with `new`, a new object is created, and `this` refers to the newly created object.

// Example of a regular function used as a constructor:

// ```javascript
// function Person(name) {
//     this.name = name;
// }

// const person = new Person('John');
// console.log(person.name); // Output: John
// ```

// **Arrow Functions:**

// 1. **`this` Binding:** Arrow functions have lexical `this` binding, which means the value of `this` is determined by the surrounding lexical scope (the scope where the arrow function is defined), not by how it is called. Arrow functions do not have their own `this`; instead, they inherit `this` from the surrounding code.

// 2. **`arguments` Object:** Arrow functions do not have their own `arguments` object. Instead, they inherit the `arguments` object from the surrounding non-arrow function.

// 3. **`new.target` Reference:** Arrow functions do not have their own `new.target` reference. They inherit `new.target` from the surrounding non-arrow function.

// 4. **Constructor Usage:** Arrow functions cannot be used as constructors with the `new` keyword. Attempting to do so will result in a TypeError because arrow functions do not have their own `this` binding.

// Example of an arrow function not suitable for use as a constructor:

// ```javascript
// const Person = (name) => {
//     this.name = name; // TypeError: Cannot set property 'name' of undefined
// }

// const person = new Person('John'); // TypeError
// ```

// In summary, regular functions have dynamic `this` binding, their own `arguments` object, and can be used as constructors with the `new` keyword. In contrast, arrow functions have lexical `this` binding, inherit `arguments` and `new.target` from the surrounding code, and cannot be used as constructors.
