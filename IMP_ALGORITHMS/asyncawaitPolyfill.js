function asyncPolyfill(generatorFunc) {
    return function (...args) {
      const generator = generatorFunc(...args);
  
      return new Promise((res, rej) => {
        function recursion(nextFunc) {
          let next;
          try {
            next = nextFunc();
          } catch (e) {
            return rej(e);
          }
          if (next.done) {
            return res(next.value);
          }
  
          Promise.resolve(next.value)
            .then((value) => recursion(() => generator.next(value)))
            .catch((err) => {
              try {
                recursion(() => generator.throw(err));
              } catch (error) {
                rej(error); // If generator.throw throws an error, reject the Promise
              }
            });
        }
  
        recursion(() => generator.next());
      });
    };
  }
  
  const resultFunc = asyncPolyfill(function* () {
    try {
      const data = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!data.ok) throw new Error("fzdfnn")
      const result = yield data.json();
  
      return result;
    } catch (err) {
      // Handle errors here if needed
      console.error('Error in async function:', err);
      throw err; // Rethrow the error to propagate it through the promise chain
    }
  });
  
  resultFunc()
    .then((val) => console.log(val))
    .catch((err) => console.error('Error in resultFunc:', err));
  