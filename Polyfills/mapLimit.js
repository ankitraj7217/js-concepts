const mapLimit = async (array, limit, iteratee) => {
    return new Promise((res, rej) => {
      let results = [];
      let idx = 0;
  
      async function next() {
        if (idx < array.length) {
          const subArray = array.slice(idx, idx + limit);
          const asyncCalls = subArray.map(async (value) => {
            return new Promise((resolve, reject) => {
              iteratee(value, (error, result) => {
                if (error) {
                  rej(error);
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            });
          });
          const resultVals = await Promise.all(asyncCalls);
          results = results.concat(resultVals);
  
          idx += limit;
  
          next();
        } else {
          res(results);
        }
      }
  
      next();
    });
  };
  
  const asyncIterateeFunc = (val, callback) => {
    setTimeout(() => {
      const res = val * 2;
      callback(null, res);
    }, 1000); // 1 sec for each, if only 1000 and no random;
  };
  
  const arr = [1, 2, 3, 4, 5];
  
  mapLimit(arr, 2, asyncIterateeFunc)
    .then((res) => console.log("mapLimit: ", res))
    .catch((err) => console.error("mapLimit: ", err));
  
  
  
  
  // iteratee called multiple times and trigger happen later on
  const mapLimit2 = async (array, limit, iteratee) => {
    return new Promise((resolve, reject) => {
      let results = [];
      let idx = 0;
      let activePromises = 0;
      let errorOccurred = false;
  
      async function processNext() {
        while (activePromises < limit && idx < array.length) {
          const currentIndex = idx++;
          activePromises++;
  
          iteratee(array[currentIndex], (error, result) => {
            activePromises--;
            if (error) {
              errorOccurred = true;
              return reject(error); // Reject the main promise on error
            }
            results[currentIndex] = result;
            if (!errorOccurred && idx < array.length) {
              processNext(); // Continue processing the next item
            } else if (activePromises === 0 && idx >= array.length) {
              resolve(results); // Resolve when all items are processed
            }
          });
        }
      }
  
      processNext();
    });
  };
  
  // Example async iteratee function
  const asyncIterateeFunc2 = (val, callback) => {
    setTimeout(() => {
      const res = val * 2;
      callback(null, res);
    }, 1000); // 1 sec for each, no random
  };
  
  // Example usage
  const arr2 = [1, 2, 3, 4, 5];
  
  mapLimit2(arr2, 2, asyncIterateeFunc2)
    .then((res) => console.log("mapLimit: ", res)) // [2, 4, 6, 8, 10]
    .catch((err) => console.error("mapLimit: ", err));
  
  
  
  
  // mapLimit with cache
  
  const mapLimitWithCache = async (array, limit, iteratee) => {
    return new Promise((res, rej) => {
      const n = array.length;
      let results = new Array(n);
      let idx = 0;
      let activePromises = 0;
      let cache = {};
  
      const processNext = () => {
        while (activePromises < limit && idx < n) {
          const currIdx = idx++;
          const value = array[currIdx];
  
          if (cache.hasOwnProperty(value)) {
            results[currIdx] = cache[value];
  
            if (idx < n) {
              processNext();
            } else if (activePromises === 0 && idx >= n) {
              res(results);
            }
  
            continue;
          }
  
          activePromises++;
  
          iteratee(value, (err, result) => {
            activePromises--;
  
            if (err) {
              rej(err);
              return;
            }
  
            cache[value] = result;
            results[currIdx] = result;
            if (idx < n) {
              processNext();
            } else if (activePromises === 0 && idx >= n) {
              res(results);
            }
          });
        }
      };
  
      processNext();
    });
  };
  
  const asyncIterateeFuncWithCache = (val, callback) => {
    setTimeout(() => {
      const res = val * 2;
      callback(null, res);
    }, 1000); // 1 sec for each, no random
  };
  
  // Example usage
  const arrWithCache = [1, 2, 3, 4, 5, 1, 2];
  
  mapLimitWithCache(arrWithCache, 2, asyncIterateeFuncWithCache)
    .then((res) => console.log("mapLimit with cache: ", res)) // [2, 4, 6, 8, 10, 2, 4]
    .catch((err) => console.error("mapLimit with cache: ", err));
  