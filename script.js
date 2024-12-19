document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("output");

  // Add the initial "Loading..." row
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
  tableBody.appendChild(loadingRow);

  // Function to create promises with random resolution time
  const createPromise = (promiseNumber) => {
    return new Promise((resolve) => {
      const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
      setTimeout(() => resolve({ promiseName: `Promise ${promiseNumber}`, time: parseFloat(time) }), time * 1000);
    });
  };

  // Create an array of promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Record the start time
  const startTime = performance.now();

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Total time in seconds

    // Clear the "Loading..." row
    tableBody.innerHTML = "";

    // Populate the table with the resolved promise data
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.promiseName}</td>
        <td>${result.time}</td>
      `;
      tableBody.appendChild(row);
    });

    // Add a row for the total time
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime}</td>
    `;
    tableBody.appendChild(totalRow);
  });
});
