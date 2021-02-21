const express = require('express');
const app = express();
const port = 8000;
var pool = require('./data/sql_details');
var json = require('./data/data_file.json');

app.use(async function(req, res, next) {
    // Catch first connection, otherwise all files trigger
    if(req.originalUrl=='/')
        await pool.query("INSERT INTO LOGGING (IP,RES_TIME) VALUES (?,?)",[req.socket.remoteAddress.replace(/^.*:/, ''),0.0]);
    next();
}, express.static("./build"));

const {
    performance,
    PerformanceObserver
} = require('perf_hooks');

app.get('/',(req,res) => {
    console.log("JOKES");
    res.sendFile('./build/index.html');
});

app.get('/quotes', async(req, res) => {
    const t0 = performance.now();
    let toReturn = [];
    if(req.query.quote)
        json.forEach(element => {
            index = element["script"].toLowerCase().indexOf(req.query.quote.toLowerCase());
            if(index!=-1)
            {
                toReturn.push({
                title:element["title"].substring(0,element["title"].length-4),
                script:lastCoupleWords(element["script"],index),
                time:timeCalc(index,element["script"])
                });
            }
        });
    const time = performance.now() - t0;
    await pool.query("INSERT INTO LOGGING (IP,RES_TIME) VALUES (?,?)",[req.socket.remoteAddress.replace(/^.*:/, ''),time]);
    res.setHeader('content-type', 'text/json');
    res.send(JSON.stringify(toReturn));
});

app.listen(port,() => {
    console.log(port);
});

// HELPER FUNCTIONS

function timeCalc(index,script)
{
  let percent = index / script.length;
  let seconds = parseInt(percent *21*60); //minutes times episodes
  minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return minutes+":"+("0" + seconds).slice(-2);
}

function lastCoupleWords(script,index)
{
  let startIndex = Math.max(0,index-100);
  let endIndex = Math.min(script.length-1,index+100);
  while (script[startIndex]!= '.' && startIndex < script.length)
  {
    startIndex++;
  }
  startIndex++;
  while (script[endIndex]!= '.' && endIndex > 0)
  {
    endIndex--;
  }
  endIndex++;

  return script.substring(Math.min(startIndex,index),Math.max(endIndex));
}