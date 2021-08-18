const readFile = require('fs.promises').readFile;
//npm install fs.promises
console.log("Beginning with return...");
readFile('./items.txt','utf8')
    .then(data => {return data})
    .then(data => {return console.log("Promise End with return: "+data+"\n\n")})
    .then(() => console.log("End with return"))
    .catch(err => console.log("Failed: " + err))




console.log("Beginning without return...");
readFile('./items.txt','utf8')
    .then(data => console.log(data))
    .then(data => console.log("Promise End without return: "+data))
    .catch(err => console.log("Failed: "+err))
console.log("End without")
