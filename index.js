var express = require('express');
var app = express();
require('dotenv').config()


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//route to handle no date in params
app.get('/api/',(req,res)=>{
    return res.json({
      "unix":new Date().getTime(),
      "utc":new Date().toUTCString()
    })
})

app.get("/api/:date", (req, res) => {
  let dateParams = req.params.date || "";

  let isValidDate = new Date(dateParams);

  if (isValidDate == "Invalid Date") {
    if (!Number(dateParams)) {
      return res.json({
        error: "Invalid Date",
      });
    } else {
      return res.json({
        unix: Number(dateParams),
        utc: new Date(Number(dateParams)).toUTCString(),
      });
    }
  } else {
    return res.json({
      unix: new Date(dateParams).getTime(),
      utc: new Date(dateParams).toUTCString(),
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
