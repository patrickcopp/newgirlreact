const express = require('express');
const app = express();
const port = 8000;

app.use(express.static("./build"));

app.get('/',(req,res) => {
    console.log("JOKES");
    res.sendFile('./build/index.html');
});

app.listen(port,() => {
    console.log(port);
});