const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello world\nrequested: '+req.url+"\n");
    res.end();
}).listen(3000);

console.log('serving since '+Date.now());