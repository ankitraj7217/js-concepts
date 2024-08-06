const mapSeries1 = async (array, iteratee) => {
    return new Promise((res, rej) => {
        const results = []
        let idx = 0;

        function next() {
            if (idx < array.length) {
                const currItem = array[idx];

                iteratee(currItem, (error, result) => {
                    if (error) {
                        rej(error)
                    } else {
                        results.push(result);
                        idx++;
                        next();
                    }
                })
            } else {
                res(results);
            }
        }

        next();
    })
}

function promisify(fn) {
    return async function (...args) {
      return new Promise((res, rej) => {
        fn(...args, (error, result) => {
          if (error) {
            rej(error);
          } else {
            res(result);
          }
        });
      });
    };
  }


const mapSeries2 = async (array, iteratee) => {
    return new Promise((res, rej) => {
        const results = [];
        let cnt = 0;

        array.forEach((val, idx) => {
            iteratee(val, (error, result) => {
                if (error) {
                    rej(error)
                } else {
                    results.push(result);
                    cnt++;

                    if (cnt >= array.length) {
                        res(results)
                    }
                }
            }) // This is not one by one. each one is called justone after another. Therefore, this push is also random.
            // Callback is needed to fix this..recursion is the only way until iteratee is async or we promisify it very properly
            // which is bound to eat your head.
        })
    })
}

const asyncIterateeFunc = (val, callback) => {
    setTimeout(() => {
        const res = val * 2;
        callback(null, res);
    }, Math.random() * 1000); // 1 sec for each, if only 1000 and no random;
    
}

const arr = [1, 2, 3, 4, 5];

mapSeries1(arr, asyncIterateeFunc)
    .then((res) => console.log("mapSeries1: ", res))
    .catch((err) => console.error("mapSeries1: ", err))

mapSeries2(arr, asyncIterateeFunc)
    .then((res) => console.log("mapSeries2: ", res))
    .catch((err) => console.error("mapSeries2: ", err))
