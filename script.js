// Create an array of promises
const promises = [
    new Promise(resolve => setTimeout(() => resolve(1), Math.random() * 2000 + 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), Math.random() * 2000 + 1000)),
    new Promise(resolve => setTimeout(() => resolve(3), Math.random() * 2000 + 1000))
];

// Display loading text
document.getElementById('table').innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Wait for all promises to resolve
Promise.all(promises).then(results => {
    // Remove loading text
    document.getElementById('table').innerHTML = '';

    // Calculate total time
    const totalTime = results.reduce((acc, time) => acc + time, 0);

    // Populate the table
    results.forEach((time, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>Promise ${index + 1}</td><td>${time}</td>`;
        document.getElementById('table').appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
    document.getElementById('table').appendChild(totalRow);
});
