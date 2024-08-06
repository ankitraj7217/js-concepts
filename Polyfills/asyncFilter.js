const asyncFilter = async (array, limit, predicate) => {
    return new Promise((resolve, reject) => {
      let results = []; // Array to store the final filtered results
      let idx = 0; // Current index in the array
      let activePromises = 0; // Number of active async operations
      let errorOccurred = false; // Flag to indicate if an error occurred
      let cache = {}; // Cache object to store results of predicate function
  
      const processNext = () => {
        while (activePromises < limit && idx < array.length) {
          const currentIndex = idx++;
          const value = array[currentIndex];
  
          // Check if the result is in the cache
          if (cache.hasOwnProperty(value)) {
            if (cache[value]) {
              results.push(value);
            }
            if (!errorOccurred && idx < array.length) {
              processNext();
            } else if (activePromises === 0 && idx >= array.length) {
              resolve(results); // Resolve when all items are processed
            }
            continue;
          }
  
          activePromises++;
  
          predicate(value, (error, result) => {
            activePromises--;
            if (error) {
              errorOccurred = true;
              return reject(error); // Reject the main promise on error
            }
            cache[value] = result; // Store the result in the cache
            if (result) {
              results.push(value); // Add to results if predicate is true
            }
            if (!errorOccurred && idx < array.length) {
              processNext(); // Continue processing the next item
            } else if (activePromises === 0 && idx >= array.length) {
              resolve(results); // Resolve when all items are processed
            }
          });
        }
      };
  
      processNext(); // Initial call to start processing
    });
  };
  
  // Example async predicate function
  const asyncPredicateFunc = (val, callback) => {
    setTimeout(() => {
      const res = val % 2 === 0; // Predicate: check if the number is even
      callback(null, res);
    }, Math.random() * 1000); // Random delay up to 1 second
  };
  
  // Example usage
  const arr = [1, 2, 3, 4, 5, 1, 2];
  
  asyncFilter(arr, 2, asyncPredicateFunc)
    .then((res) => console.log("asyncFilter: ", res)) // [2, 4, 2]
    .catch((err) => console.error("asyncFilter: ", err));
  