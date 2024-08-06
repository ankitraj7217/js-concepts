function* simpleGenerator() {
    console.log('First yield');
    const value1 = yield 'First yield result'; // next() will return next params passed in second iteration
    console.log('Received after first yield:', value1);
  
    console.log('Second yield');
    const value2 = yield 'Second yield result';
    console.log('Received after second yield:', value2);
  
    return 'Finished';
  }
  
  // Create a generator object
  const gen = simpleGenerator();
  
  // Start the generator
  let result = gen.next();
  console.log(result.value);  // Outputs: 'First yield result'
  
  // Pass a value back to the generator
  result = gen.next('Value passed to first yield');
  console.log(result.value);  // Outputs: 'Second yield result'
  
  // Pass another value back to the generator
  result = gen.next('Value passed to second yield');
  console.log(result.value);  // Outputs: 'Finished'
  