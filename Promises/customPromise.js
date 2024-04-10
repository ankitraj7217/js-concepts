const PENDING = 0
const FULFILLED = 1
const REJECTED = -1

function CustomPromise (executor) {
    let state = PENDING
    let value = undefined
    const handlers = [];
    const catches = [];

    function resolve(result) {
        if (state !== PENDING) return;

        state = FULFILLED;
        value = result;

        handlers.forEach(handler => handler(result))
    }

    function reject(err) {
        if (state !== PENDING) return;

        state = REJECTED;
        value = err;

        catches.forEach(catchFunc => catchFunc(err))
    }

    this.then = function(callback) {
        if (state === FULFILLED) {
            callback();    
        } else {
            handlers.push(callback);
        }
        

        // should return a promise encapsulating callback
    }

    // implement this,catch

    executor(resolve, reject);
}

const p1 = new CustomPromise((res, rej) => {
    setTimeout(() => res(5), 1000)
})

p1.then(val => console.log(val))
