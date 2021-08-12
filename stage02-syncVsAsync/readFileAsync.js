const readFile = require('fs').readFile;

let fileData="";
console.log("Beginning...");

readFile('items.txt','utf8',(err,data) => {
  if(err){
    console.log(err);
  } else {
    fileData=data;
    console.log("callback data:\n"+data);
  }
});

console.log("sin callback fileData:\n"+fileData);