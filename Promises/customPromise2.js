const PENDING = 0;
const FULFILLED = 1;
const REJECTED = -1;

function CustomPromise(executor) {
    let state = PENDING;
    let value = undefined;
    const handlers = [];
    const catches = [];

    function resolve(result) {
        if (state !== PENDING) return;

        state = FULFILLED;
        value = result;

        handlers.forEach(handler => handler(result));
    }

    function reject(err) {
        if (state !== PENDING) return;

        state = REJECTED;
        value = err;

        catches.forEach(catchFunc => catchFunc(err));
    }

    this.then = function(callback) {
        return new CustomPromise((resolve, reject) => {
            function handle(value) {
                try {
                    const result = callback(value);
                    if (result instanceof CustomPromise) {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err);
                }
            }

            if (state === FULFILLED) {
                handle(value);
            } else {
                handlers.push(handle);
            }
        });
    };

    this.catch = function(callback) {
        return new CustomPromise((resolve, reject) => {
            function handleError(err) {
                try {
                    const result = callback(err);
                    if (result instanceof CustomPromise) {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err);
                }
            }

            if (state === REJECTED) {
                handleError(value);
            } else {
                catches.push(handleError);
            }
        });
    };

    executor(resolve, reject);
}

// Usage example
const p1 = new CustomPromise((res, rej) => {
    setTimeout(() => res(5), 1000);
});

p1.then(val => {
    console.log(val);
    return val * 2;
}).then(val => {
    console.log(val);
}).catch(err => {
    console.error(err);
});
