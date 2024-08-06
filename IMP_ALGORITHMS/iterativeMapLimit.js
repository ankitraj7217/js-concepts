// iteratee => callback(error, null)

function mapLimit(array, limit, iteratee, finCb, isCacheEnabled = false) {
    return new Promise((res, rej) => {
      const resolvedArr = [];
      const rejectedArr = [];
      const cache = {};
      const len = array.length;
      const slicedArr = Array.from({ length: Math.ceil(len / limit) }, (_, idx) =>
        array.slice(idx * limit, limit + idx * limit)
      );
  
      async function processValues() {
        for (const arr of slicedArr) {
          const promisifyArr = arr.map(async (ele) => {
            return new Promise((innerResolve, innerReject) => {
              if (cache[ele] && isCacheEnabled) {
                cache[ele].status === "fulfilled"
                  ? innerResolve(cache[ele]["value"])
                  : innerReject(cache[ele]["reason"]);
              } else {
                iteratee(ele, (innerErr, innerResult) => {
                  if (innerErr) {
                    cache[ele] = { status: "rejected", reason: innerErr };
                    innerReject(innerErr);
                  } else {
                    cache[ele] = { status: "fulfilled", value: innerResult };
                    innerResolve(innerResult);
                  }
                });
              }
            });
          });
  
          const promisifiedResult = await Promise.allSettled(promisifyArr);
  
          promisifiedResult.forEach(({ status, value, reason }) => {
            if (status === "fulfilled") {
              resolvedArr.push(value);
            } else {
              rejectedArr.push(reason);
            }
          });
  
          console.log("check1: ", resolvedArr, rejectedArr);
        }
        console.log("check2");
        finCb(rejectedArr, resolvedArr);
      }
  
      processValues();
    });
  }
  
  const iterateeFunc = (value, cb) => {
    setTimeout(function () {
      value *= 2;
      if (Math.random() > 0.5) cb("abcd", null);
      cb(null, value);
    }, 2000);
  };
  
  const finCbFunc = (errArr, successArr) => {
    console.log("errArr: ", errArr);
    console.log("successArr: ", successArr);
  };
  
  mapLimit([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4], 2, iterateeFunc, finCbFunc, true);
  





// iteratee => callback(error, null)

function mapLimit2(array, limit, iteratee, finCb, isCacheEnabled = false) {
  const resolvedArr = [];
  const rejectedArr = [];
  const cache = {};
  const len = array.length;
  let activeIdx = 0;
  let currIdx = 0;

  function processNext() {
    while (activeIdx < limit && currIdx < len) {
      console.log("currIdx: ", currIdx, activeIdx, limit);
      const value = array[currIdx++];
      activeIdx++;

      if (cache[value] && isCacheEnabled) {
        const { status, result, reason } = cache[value];
        if (status === "fulfilled") {
          resolvedArr.push(result);
        } else {
          rejectedArr.push(reason);
        }

        if (resolvedArr.length + rejectedArr.length === len) {
          finCb(rejectedArr, resolvedArr);
        }

        processNext();
      } else {
        iteratee(value, (err, result) => {
          activeIdx--;
          if (isCacheEnabled) {
            cache[value] = err
              ? {
                  status: "rejected",
                  reason: err,
                }
              : {
                  status: "fulfilled",
                  result: result,
                };
          }

          if (err) {
            rejectedArr.push(err);
          } else {
            resolvedArr.push(result);
          }

          processNext();

          if (resolvedArr.length + rejectedArr.length === len) {
            finCb(rejectedArr, resolvedArr);
          }
        });
      }
    }
  }

  processNext();
}

const iterateeFunc2 = (value, cb) => {
  setTimeout(function () {
    value *= 2;
    if (Math.random() > 0.5) cb("abcd", null);
    cb(null, value);
  }, Math.random() * 10000);
};

const finCbFunc2 = (errArr, successArr) => {
  console.log("errArr: ", errArr);
  console.log("successArr: ", successArr);
};

mapLimit2(
  [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4],
  2,
  iterateeFunc2,
  finCbFun2c,
  true
);
