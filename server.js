// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", function(req, res){
  let reqDateString = req.params.date_string;
  let newDate;
  
  if (!reqDateString){
    newDate = new Date();
  }
  
  if (/(^[-+]?)([1-9][0-9]*)$/.test(reqDateString)) {
    newDate = new Date(parseInt(reqDateString + '000'));
  }
  // https://www.w3.org/TR/NOTE-datetime
  let reg = /^(\d{4})(-(0[1-9]|1[0-2]))?(-((0[1-9]|[1-2]\d|3[0-1])))?((T([0-1]\d|2[0-3]):([0-5]\d)(:([0-5]\d)(\.\d+)?)?)?([-+]([0-1]\d|2[0-3]):([0-5]\d))?)?$/;
  if (reg.test(reqDateString)){
    newDate = new Date(reqDateString);
  }
  
  if (!newDate || isNaN(newDate.getTime())){
    res.json({"unix": null, "utc" : "Invalid Date" });
  } else {
    res.json({"unix": newDate.getTime(), "utc" : newDate.toUTCString() });
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});