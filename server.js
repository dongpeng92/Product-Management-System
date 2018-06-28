var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

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
  username: String,
  email: String,
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

app.post('/authenticate', function (req, res) {
  console.log(req.body);
  var token = jwt.sign({'uname': req.body.username}, 'marlabs-secret-key', {
    expiresIn: '1h'
  });
  user_model.findOne({'username': req.body.username, 'password': req.body.password}, function (err, user) {
    if (!err) {
      res.send({
        isLoggedIn: true,
        token: token
      });
    } else {
      res.send({
        isLoggedIn: false
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Sever running @ localhost:3000");
});
