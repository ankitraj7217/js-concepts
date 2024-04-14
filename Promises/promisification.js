function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // fn definition should have callback which should be called with (error, result) type
      fn(...args, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };
}

// eg 1:
// Define a callback-based function that intentionally throws an error
function fetchData(id, callback) {
  setTimeout(() => {
    callback(new Error("Failed to fetch data"));
  }, 1000);
}

// Promisify the fetchData function
const fetchDataAsync = promisify(fetchData);

// normal call would be -> fetchData(123, (error, res) => {Handle cases accordingly})

// Use the promisified function with error handling
fetchDataAsync(123)
  .then((data) => console.log("Data:", data)) // This won't execute in case of an error
  .catch((error) => console.error("Error:", error.message)); // Handle the error

// eg 2
// Define a callback-based function
function addNumbers(a, b, callback) {
  setTimeout(() => {
    callback(null, a + b);
  }, 1000);
}

// Promisify the addNumbers function
const addNumbersAsync = promisify(addNumbers);

// Use the promisified function
addNumbersAsync(5, 7)
  .then((sum) => console.log("Sum:", sum))
  .catch((error) => console.error("Error:", error));
