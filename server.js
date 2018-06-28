var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/product_management');
var db = mongoose.connection;
db.on('error', function () {
  console.log("Error happens!!");
});
db.on('open', function () {
  console.log("Connection established!!!");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var user_schema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
var user_model = mongoose.model('users', user_schema);


app.post('/register', function (req, res) {
  console.log(req.body);
  var new_user = user_model(req.body);
  new_user.save(function (err) {
    if (!err) {
      console.log("data save!");
      res.send({
        flg: true
      });
    }
  });

});

app.listen(3000, function () {
  console.log("Sever running @ localhost:3000");
});
