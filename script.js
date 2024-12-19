document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add the "Loading..." row initially
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random delay (1-3 seconds)
  const createPromise = (index) => {
    const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: `Promise ${index}`,
          time: delay.toFixed(3),
        });
      }, delay * 1000);
    });
  };

  // Function to handle the completion of all promises
  const handlePromises = (results) => {
    const endTime = performance.now(); // Record the end time

    // Remove the "Loading..." row and append the results
    output.innerHTML = "";
    let totalTime = 0;

    // Create and append rows for each promise result
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      output.appendChild(row);
      totalTime += parseFloat(result.time); // Add the time taken by each promise
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${(totalTime).toFixed(3)}</td>`;
    output.appendChild(totalRow);
  };

  // Create three promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  const startTime = performance.now(); // Record the start time

  // Wait for all promises to resolve
  Promise.all(promises)
    .then((results) => {
      handlePromises(results); // Handle the results and append them to the table
    })
    .catch((error) => {
      // Handle any errors that occur during the promise resolution
      output.innerHTML = `<tr><td colspan="2">Error: ${error.message}</td></tr>`;
    });
});
