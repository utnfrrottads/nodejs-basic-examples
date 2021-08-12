const readFileSync = require('fs').readFileSync;

console.log('Beginning....');
let fileData=readFileSync('items.txt','utf8');
console.log(fileData);
console.log('End');