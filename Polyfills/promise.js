// Promise.all

const promise1 = new Promise((res, rej) => {
    res(1);
    rej("a");
  });
  
  const promise2 = new Promise((res, rej) => {
    res(2);
    rej("b");
  });
  
  const promise3 = new Promise((res, rej) => {
    res(3);
    rej("c");
  });
  
  Promise.all([promise1, promise2, promise3])
    .then((res) => console.log("Promise All =========== :", res))
    .catch((err) => console.error("Promise All: ", err));
  
  const promiseAllPolyfill = async (promiseArr) => {
    return new Promise((res, rej) => {
      console.log("Polyfill Promise All");
      const FIN_RES = [];
  
      const len = promiseArr.length;
      let cnt = 0;
      let totalPromiseResolved = len;
  
      // better use forEach and its idx
      while (cnt < len) {
        const tempVal = cnt;
        promiseArr[tempVal]
          .then((data) => {
            FIN_RES[tempVal] = data;
            totalPromiseResolved--;
  
            if (totalPromiseResolved === 0) {
              res(FIN_RES);
            }
          })
          .catch((err) => {
            rej(err);
          });
  
        cnt++;
      }
    });
  };
  
  promiseAllPolyfill([promise1, promise2, promise3])
    .then((res) => console.log("Polyfill All polyfill: ", res))
    .catch((err) => console.error("Polyfill All polyfill: ", err));
  
  Promise.allSettled([promise1, promise2, promise3])
    .then((res) => console.log("Promise All Settled =======: ", res))
    .catch((err) => console.error(err));
  
  const promiseAllSettled = async (promiseArr) => {
    return new Promise((res, rej) => {
      const RES_ARR = [];
      let len = promiseArr.length;
  
      promiseArr.forEach((promise, idx) => {
        promise
          .then((data) => {
            RES_ARR[idx] = {
              status: "fulfilled",
              value: data,
            };
          })
          .catch((err) => {
            RES_ARR[idx] = {
              status: "rejected",
              reason: err,
            };
          })
          .finally(() => {
            len--;
            if (len === 0) res(RES_ARR);
          });
      });
    });
  };
  
  promiseAllSettled([promise1, promise2, promise3])
    .then((res) => console.log("Promise All Settled polyfill =======: ", res))
    .catch((err) => console.error(err));
  
  Promise.any([promise1, promise2, promise3])
    .then((data) => console.log("Promie Any ====== : ", data))
    .catch((err) => console.error(err));
  
  const promiseAny = async (promiseArr) => {
    return new Promise((res, rej) => {
      let errorCnt = 0;
      const errors = [];
  
      promiseArr.forEach((promise, idx) => {
        promise
          .then((data) => {
            res(data);
          })
          .catch((err) => {
            errorCnt++;
            errors[idx] = err;
            if (errorCnt === promiseArr.length) {
              const aggregateError = new AggregateError(
                errors,
                "All promises were rejected"
              );
              rej(aggregateError);
            }
          });
      });
    });
  };
  
  promiseAny([promise1, promise2, promise3])
    .then((data) => console.log("Promie Any Polyfill ====== : ", data))
    .catch((err) => console.error("Promise Any Polyfill: ", err));
  
  Promise.race([promise1, promise2, promise3])
    .then((data) => console.log("Promise Race ====== : ", data))
    .catch((err) => console.error("Promise race: ", err));
  
  const promiseRace = async (promiseArr) => {
    return new Promise((res, rej) => {
      promiseArr.forEach((promise, idx) => {
        promise
          .then((data) => res(data))
          .catch((err) => console.error(err));
      });
    });
  };
  
  promiseRace([promise1, promise2, promise3])
    .then((data) => console.log("Promise Race polyfill ====== : ", data))
    .catch((err) => console.error("Promise race polyfill: ", err));
  
  