function simulateAsyncOperation(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeout < 1000) {
        reject('Error: timeout is less than 1000 ms');
      } else {
        resolve(`Success: completed in ${timeout} ms`);
      }
    }, timeout);
  });
}

async function performAsyncTask(timeout) {
  try {
    const result = await simulateAsyncOperation(timeout);
    console.log(result);
  } catch (error) {
    console.log('Caught Error:', error);
  }
}

performAsyncTask(1500);
performAsyncTask(500);