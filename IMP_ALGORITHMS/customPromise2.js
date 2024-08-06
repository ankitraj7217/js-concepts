function MyPromise(executor) {
    const PENDING = "Pending";
    const FULFILLED = "Fulfilled";
    const REJECTED = "Rejected";
    
    let state = PENDING;
    let value = null;
    let error = null;
    const handlers = []
    const errorsHandler = []
    
    function resolve(val) {
      if (state !== PENDING) return;
      
       value = val;
       state = FULFILLED;
       handlers.forEach(handler => handler(val));
    }
    
    function reject(err) {
      if (state !== PENDING) return;
      
      error = err;
      state = REJECTED;
      errorsHandler.forEach(errHandler => {
        errHandler(err)
      });
    }
    
    this.then = function(successCb, failCb) {
      return new MyPromise((res, rej) => {
        function handleSuccess(successValue) {
          const result = successCb ? successCb(successValue) : value;
          
          if (result instanceof MyPromise) {
            result.then(res, rej);
          } else {
            res(result);
          }
        }
        
        function handleError(failureErr) {
          const result = failCb ? failCb(failureErr) : failureErr;
          
          if (result instanceof MyPromise) {
            result.then(res, rej);
          } else {
            rej(result)
          }
        }
        
        if (state === FULFILLED) {
          handleSuccess(value);
        } else if (state === REJECTED) {
          handleError(error);
        } else {
          handlers.push(handleSuccess);
          errorsHandler.push(handleError);
        }
      })
    }
    
    this.catch = function(errorCb) {
      return this.then(null, errorCb)
    }
    
    this.finally = function(cb) {
      return this.then(
          (value) => MyPromise.resolve(cb()).then(() => value),
          (err) => MyPromise.reject(cb()).then(() => {throw err})
        )
    }
    
    executor(resolve, reject);
  }
  
  MyPromise.resolve = function(value) {
    return new MyPromise((res, rej) => res(value))
  }
  
  MyPromise.reject = function(err) {
    return new MyPromise((res, rej) => rej(err))
  }
  
  MyPromise.all = function(promiseArr) {
    return new MyPromise((res, rej) => {
      const resultArr = [];
      const len = promiseArr.length;
      let resolvedPromise = 0;
      
      promiseArr.forEach((promiseEle, idx) => {
        promiseEle.then((value) => {
          resolvedPromise++;
          resultArr[idx] = value;
          if (resolvedPromise === len) {
            res(resultArr)
          }
        }).catch((err) => {
        rej(err);
      })
      })
    })
  }
  
  
  const p1 = new MyPromise((res, rej) => {
    setTimeout(function() {res(5)}, 1000);
  })
  
  const p2 = new MyPromise((res, rej) => {
    setTimeout(function() {rej(10)}, 1000);
  })
  
  console.log("check1")
  
  p1.then((val) => console.log("fin then: ", val))
      .then((val) => console.log("heihh: ", val))
    .catch((err) => console.log("fin err: ", err))
    .finally((abc) => console.log("finally"))
    .then((value) => console.log(value))
    
  MyPromise.all([p1, p2])
          .then(result => console.log("all result: ", result))
          .catch(err => console.log("all result failed: ", err))
  
  console.log("check2")