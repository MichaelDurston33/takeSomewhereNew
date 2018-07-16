var express = require("express");
var app = express();
var path = require('path');
var cors = require('cors')

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/homepage.html'));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000")
});

app.use(express.static('public'));
app.use(cors())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
