const tbody = document.getElementById('output');

const promises = [
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      resolve(time);
    }, time);
  }),
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      resolve(time);
    }, time);
  }),
  new Promise((resolve) => {
    const time = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      resolve(time);
    }, time);
  }),
];

const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
tbody.appendChild(loadingRow);

Promise.all(promises).then((results) => {
  tbody.removeChild(loadingRow);
  results.forEach((result, index) => {
    const row = document.createElement('tr');
    const promiseCell = document.createElement('td');
    promiseCell.textContent = `Promise ${index + 1}`;
    const timeCell = document.createElement('td');
    timeCell.textContent = `${result / 1000} seconds`;
    row.appendChild(promiseCell);
    row.appendChild(timeCell);
    tbody.appendChild(row);
  });
  const totalRow = document.createElement('tr');
  const totalCell = document.createElement('td');
  totalCell.textContent = 'Total';
  const totalTimeCell = document.createElement('td');
  const totalTime = results.reduce((acc, result) => acc + result, 0);
  totalTimeCell.textContent = `${totalTime / 1000} seconds`;
  totalRow.appendChild(totalCell);
  totalRow.appendChild(totalTimeCell);
  tbody.appendChild(totalRow);
});