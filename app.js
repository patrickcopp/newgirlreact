const express = require('express');
const app = express();

app.use(express.static('./build'));

app.get('/',(req,res) => {
    res.sendFile('./build/index.html');
});

app.listen(8080,() => {
    console.log("SERVER");
});