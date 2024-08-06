function MyPromise(executor) {
    const PENDING = 0;
    const FULFILLED = 1;
    const REJECTED = -1;

    let value = null;
    let err = null;
    let state = PENDING;
    let handlers = [];
    let catches = [];


    function resolve(val) {
        if (state !== PENDING) return; // already resolved

        state = FULFILLED;

        value = val;
        handlers.forEach(handler => handler(val));
    }

    function reject(err) {
        if (state !== PENDING) return; // already resolved

        state = REJECTED;

        err = err;
        catches.forEach(catchHandler => catchHandler(err));
    }

    this.then = function(resCb, rejCb) {
        return new MyPromise((res, rej) => {
            function handleFulfilled(value) {
                const result = resCb ? resCb(value) : value;

                if (result instanceof MyPromise) {
                    result.then(res, rej);
                } else {
                    res(result);
                }
            }

            function handleRejected(value) {
                const error = rejCb ? rejCb(value) : value;

                if (error instanceof MyPromise) {
                    error.then(res, rej);
                } else {
                    rej(error);
                }
            }

            if (state === FULFILLED) {
                handleFulfilled(value);
            } else if (state === REJECTED) {
                handleRejected(err);
            } else {
                handlers.push(handleFulfilled);
                catches.push(handleRejected);
            }
        })
    }

    this.catch = function(rejCb) {
        return this.then(null, rejCb);
    } 

    this.finally = function (callback) {
        if (typeof callback !== "function") {
            return this.then(callback, callback);
        }
        return this.then(
            (val) => MyPromise.resolve(callback()).then(() => val),
            (err) => MyPromise.reject(callback()).then(() => {throw err})
        )
    }

    executor(resolve, reject);
}

MyPromise.resolve = function(value) {
    return new MyPromise((resolve) => {
        resolve(value);
    });
};

MyPromise.reject = function(error) {
    return new MyPromise((resolve, reject) => {
        reject(error);
    });
};


const p1 = new MyPromise((res, rej) => {
    setTimeout(() => res(5), 1000);
});

const p2 = new Promise((res, rej) => {
    setTimeout(() => res(5), 1000);
});

p1.then(val => {
    console.log(val);
    return p1;
}).then(val => {
    console.log("here: ", val);
}).catch(err => {
    console.error(err);
}).finally(() => {
    console.log("yes")
})

console.log("---------")

p2.then(val => {
    console.log(val);
    return p2;
}).then(val => {
    console.log("here: ", val);
}).catch(err => {
    console.error(err);
}).finally(() => {
    console.log("yes")
})