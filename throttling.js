function throttling(fn, delay) {
    let timeOut;
    let lastExecutionTime = 0;
    let counter = 0;
  
    return function (...args) {
      const currentTime = Date.now();
      if (!lastExecutionTime || currentTime - lastExecutionTime >= delay) {
        fn.apply(this, args);
        lastExecutionTime = currentTime;
        clearTimeout(timeOut);
        counter++;
        console.log("counter: ", counter);
      } else {
          // for last edge case, others will be handled by above
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          fn.apply(this, args);
          lastExecutionTime = currentTime;
          counter++;
          console.log("counter: ", counter);
        }, delay);
      }
    };
  }
  
  const input = document.querySelector("input");
  
  const check1 = throttling(() => {
    console.log("check1");
  }, 400);
  const check2 = throttling(() => {
    console.log("check2");
  }, 400);
  
  check1();
  check2();
  
  // only one function is attached. can check from above code.
  input.addEventListener(
    "input",
    throttling((e) => {
      console.log("event: ", e.target.value);
    }, 1000)
  );
  