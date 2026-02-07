function fetchDataWithCallback(callback) {
  setTimeout(() => {
    const data = 'Data from Callback';
    callback(null, data);
  }, 2000);
}

function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = 'Data from Promise';
      resolve(data);
    }, 2000);
  });
}

fetchDataWithCallback((error, result) => {
  if (error) {
    console.log('Callback Error:', error);
  } else {
    console.log('Callback Result:', result);
  }
});

fetchDataWithPromise()
  .then((result) => {
    console.log('Promise Result:', result);
  })
  .catch((error) => {
    console.log('Promise Error:', error);
  });