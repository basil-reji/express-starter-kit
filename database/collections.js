fs = require('fs');

let collections = {};

fs.readFile('./database/collections.json', (err,data) => {
    if (err) throw err;
    collections = JSON.parse(data);
});
// console.log(collections);

module.exports = { collections }