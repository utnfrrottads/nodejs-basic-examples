const readFile = require('fs').promises.readFile;

let read = async() =>{
    try {
        console.log("Beginning with async/await...");
        let data = await readFile('items.txt', 'utf8');
        console.log("Promise End with async/await: " + data + "\n\n");
        console.log("End with async/await");
    } catch(err) {
        console.log("Failed: "+err)
    }
}

read();