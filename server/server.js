var express = require("express");
var app = express();
var path = require('path');

const port = process.env.PORT || 3000;


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/homepage.html'));
});

app.listen(port, () => {
  console.log("Server listening on port " + port)
});

app.use(express.static('public'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
