const list=['a', 'white',15,true,{firstName:"John",lastName:"Doeperez"}];
let i=0;

const log = (text) => console.log(text);

function log2(texto) {
    console.log("log2: "+texto)
}

function log3(texto){
    log(JSON.stringify(texto));
}


function doThis(callback, items){
    i++
    console.log("doing something "+i);
    log("traditional code "+i);
    items.forEach( (item,i,err) => {
        callback(item);
    });

    log("hipster's code"+i )
    items.forEach(callback);
}

doThis(log,list);
console.log("\n\n");
doThis(log2,list);
console.log("\n\n");
doThis(log3,list);