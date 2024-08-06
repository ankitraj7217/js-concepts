Promise.prototype.polyfillFinally = function (callback) {
    if (typeof callback !== "function") {
        console.log("callback: ", callback)
        return this.then(callback, callback)
    }
    return this.then(
        (value) => {Promise.resolve(callback()).then(() => { return value; })},
        (err) => {Promise.resolve(callback()).then(() => { throw err; })}
    )
}

Promise.resolve(2)
        .polyfillFinally(5)
        .then((data) => {
            console.log("2nd: ", data);
            2;
        })
