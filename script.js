document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add a loading row initially
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  const createPromise = (index) => {
    const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: `Promise ${index}`, time: delay.toFixed(3) });
      }, delay * 1000);
    });
  };

  // Create 3 promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  const startTime = performance.now(); // Start timing the total execution

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    const endTime = performance.now(); // End timing the total execution

    // Remove the loading row
    output.innerHTML = "";

    let totalTime = 0;

    // Add rows for each resolved promise
    results.forEach((result, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      output.appendChild(row);
      totalTime += parseFloat(result.time);
    });

    // Add the total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${((endTime - startTime) / 1000).toFixed(3)}</td>`;
    output.appendChild(totalRow);
  });
});
