// arr.map((val, i, arr) => {});
Array.prototype.myMap = function(cb) {
    let temp = [];
    for(let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }

    return temp;
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      // Ensure the callback is a function
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      // Create a new array to hold the mapped elements
      const result = new Array(this.length);
  
      // Iterate through the array
      for (let i = 0; i < this.length; i++) {
        // Check if the element exists in the array (to handle sparse arrays)
        if (i in this) {
          // Apply the callback with the optional thisArg
          result[i] = callback.call(thisArg, this[i], i, this);
        }
      }
      return result;
    };
  }
  

// arr.filter((val, i, arr) => {});
Array.prototype.myFilter = function(cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            temp.push(arr[i]);
        }
    }

    return temp;
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback, thisArg) {
      // Ensure the callback is a function
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      // Create a new array to hold the filtered elements
      const result = [];
      const length = this.length;
  
      // Iterate through the array
      for (let i = 0; i < length; i++) {
        // Check if the element exists in the array (to handle sparse arrays)
        if (i in this) {
          // Apply the callback with the optional thisArg
          if (callback.call(thisArg, this[i], i, this)) {
            // If the callback returns true, add the element to the result
            result.push(this[i]);
          }
        }
      }
      return result;
    };
  }
  

// arr.reduce((acc, curr, idx, arr) => {}, start);
Array.prototype.myReduce = function(cb, start) {
    let temp = start;

    for (let i = 0; i < this.length; i++) {
        temp = temp ? cb(temp, this[i], i, this) : this[i];
    }

    return temp;
}

if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, initialValue) {
      // Ensure the callback is a function
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      // Handle the initial value
      let accumulator = initialValue;
      let startIndex = 0;
  
      // If no initial value is provided, use the first element of the array
      if (accumulator === undefined) {
        if (this.length === 0) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = this[0];
        startIndex = 1;
      }
  
      // Iterate through the array
      for (let i = startIndex; i < this.length; i++) {
        // Check if the element exists in the array (to handle sparse arrays)
        if (i in this) {
          // Apply the callback and update the accumulator
          accumulator = callback(accumulator, this[i], i, this);
        }
      }
      return accumulator;
    };
  }
  

const arr = [1,2,3,4];
console.log(arr.myFilter((num) => num % 2));


if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
      // Ensure the callback is a function
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      // Iterate through the array
      for (let i = 0; i < this.length; i++) {
        // Check if the element exists in the array (to handle sparse arrays)
        if (i in this) {
          // Apply the callback with the optional thisArg
          callback.call(thisArg, this[i], i, this);
        }
      }
    };
  }
   