http = require('http');

http.createServer((req, res) => {
    res.write('hello world')
    console.log("hello");
    res.end();
}).listen(5000);