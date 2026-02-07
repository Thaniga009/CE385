function fetchDataFromServer1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data from Server 1');
    }, 2000);
  });
}

function fetchDataFromServer2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error from Server 2');
    }, 1000);
  });
}

function fetchDataFromServer3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data from Server 3');
    }, 3000);
  });
}

// Case 1: First successful response
Promise.any([
  fetchDataFromServer1(),
  fetchDataFromServer2(),
  fetchDataFromServer3()
])
  .then((result) => {
    console.log('First successful response:', result);
  })
  .catch((error) => {
    console.log('All servers failed:', error);
  });

// Case 2: All results including errors
Promise.allSettled([
  fetchDataFromServer1(),
  fetchDataFromServer2(),
  fetchDataFromServer3()
])
  .then((results) => {
    console.log('All results:');
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Server ${index + 1} Success:`, result.value);
      } else {
        console.log(`Server ${index + 1} Error:`, result.reason);
      }
    });
  });