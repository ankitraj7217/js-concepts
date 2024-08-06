function mapLimit(arr, limit, iterateeFn, finalCallback) {
    const results = [];
    let activeTasks = 0;
    let currentIndex = 0;
    let hasError = false;
  
    // Function to process the next item in the array
    function next() {
      while (activeTasks < limit && currentIndex < arr.length && !hasError) {
        const index = currentIndex++;
        activeTasks++;
        
        iterateeFn(arr[index], (err, result) => {
          activeTasks--;
          
          if (err) {
            hasError = true;
            return finalCallback(err);
          }
          
          results[index] = result;
          
          if (results.length === arr.length && !results.includes(undefined)) {
            return finalCallback(null, results);
          }
          
          next(); // Process the next item
        });
      }
    }
  
    next();
  }
  
  // Example async iteratee function
  function asyncIteratee2(item, callback) {
    setTimeout(() => {
      callback(null, item * 2);
    }, Math.random() * 1000); // Random delay up to 1 second
  }
  
  // Test cases
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8];
  
  mapLimit(testArray, 2, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 3, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 1, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 4, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 5, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 6, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 7, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimit(testArray, 8, asyncIteratee2, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });

  
  function mapLimitWithCache(arr, limit, iterateeFn, finalCallback) {
    const results = [];
    const cache = new Map(); // Cache to store results of previously processed items
    let activeTasks = 0;
    let currentIndex = 0;
    let hasError = false;
  
    // Function to process the next item in the array
    function next() {
      while (activeTasks < limit && currentIndex < arr.length && !hasError) {
        const index = currentIndex++;
        
        if (cache.has(arr[index])) {
          results[index] = cache.get(arr[index]);
          if (results.length === arr.length && !results.includes(undefined)) {
            return finalCallback(null, results);
          }
          continue;
        }
  
        activeTasks++;
        
        iterateeFn(arr[index], (err, result) => {
          activeTasks--;
          
          if (err) {
            hasError = true;
            return finalCallback(err);
          }
          
          results[index] = result;
          cache.set(arr[index], result); // Store the result in cache
          
          if (results.length === arr.length && !results.includes(undefined)) {
            return finalCallback(null, results);
          }
          
          next(); // Process the next item
        });
      }
    }
  
    next();
  }
  
  // Example async iteratee function
  function asyncIteratee(item, callback) {
    setTimeout(() => {
      callback(null, item * 2);
    }, Math.random() * 1000); // Random delay up to 1 second
  }
  
  // Test cases
  const testArray2 = [1, 2, 3, 4, 5, 6, 7, 8];
  
  mapLimitWithCache(testArray2, 2, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 3, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 1, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 4, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 5, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 6, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 7, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  
  mapLimitWithCache(testArray2, 8, asyncIteratee, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Results:', results); // [2, 4, 6, 8, 10, 12, 14, 16]
    }
  });
  