const PENDING = 0; // Initial state
const FULFILLED = 1; // State when resolved
const REJECTED = -1; // State when rejected

function CustomPromise(executor) {
    let state = PENDING; // Current state of the promise
    let value = undefined; // Resolved or rejected value
    const handlers = []; // Handlers for then callbacks
    const catches = []; // Handlers for catch callbacks

    // Function to handle promise resolution
    function resolve(result) {
        if (state !== PENDING) return; // Ensure state change happens only once

        state = FULFILLED; // Update state to fulfilled
        value = result; // Set the resolved value

        // Execute all stored then handlers
        handlers.forEach(handler => handler(result));
    }

    // Function to handle promise rejection
    function reject(err) {
        if (state !== PENDING) return; // Ensure state change happens only once

        state = REJECTED; // Update state to rejected
        value = err; // Set the rejected value

        // Execute all stored catch handlers
        catches.forEach(catchFunc => catchFunc(err));
    }

    // Method to add a then handler
    this.then = function(callback) {
        // Return a new promise to enable chaining
        return new CustomPromise((resolve, reject) => {
            function handle(value) {
                try {
                    const result = callback(value); // Execute the callback
                    if (result instanceof CustomPromise) {
                        // If the result is a promise, wait for it to resolve
                        result.then(resolve).catch(reject);
                    } else {
                        // Otherwise, resolve with the result
                        resolve(result);
                    }
                } catch (err) {
                    // If an error occurs, reject the promise
                    reject(err);
                }
            }

            if (state === FULFILLED) {
                // If already fulfilled, handle the value immediately
                handle(value);
            } else {
                // Otherwise, store the handler to execute later
                handlers.push(handle);
            }
        });
    };

    // Method to add a catch handler
    this.catch = function(callback) {
        // Return a new promise to enable chaining
        return new CustomPromise((resolve, reject) => {
            function handleError(err) {
                try {
                    const result = callback(err); // Execute the callback
                    if (result instanceof CustomPromise) {
                        // If the result is a promise, wait for it to resolve
                        result.then(resolve).catch(reject);
                    } else {
                        // Otherwise, resolve with the result
                        resolve(result);
                    }
                } catch (err) {
                    // If an error occurs, reject the promise
                    reject(err);
                }
            }

            if (state === REJECTED) {
                // If already rejected, handle the error immediately
                handleError(value);
            } else {
                // Otherwise, store the handler to execute later
                catches.push(handleError);
            }
        });
    };

    // Execute the executor function with resolve and reject functions
    executor(resolve, reject);
}

// Usage example
const p1 = new CustomPromise((res, rej) => {
    setTimeout(() => res(5), 1000); // Resolve with 5 after 1 second
});

p1.then(val => {
    console.log(val); // Should log 5
    return val * 2; // Return 10 for the next then
}).then(val => {
    console.log(val); // Should log 10
}).catch(err => {
    console.error(err); // Handle any errors
});
