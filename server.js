var express = require('express'),
    app = express(),
    cors = require('cors'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    formidable = require('formidable'),
    uuidV1 = require("uuid/v1"),
    jwt = require('jsonwebtoken');

var UPLOAD_FOLDER = '/img/';

var assets_new = 'public';

app.use(express.static(assets_new));

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

var product_schema = mongoose.Schema({
  "productId": Number,
  "productName": String,
  "productCode": String,
  "releaseDate": String,
  "description": String,
  "price": Number,
  "starRating": Number,
  "imageUrl": String
});
var product_model = mongoose.model('products', product_schema);

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

app.use(function (req, res, next) {
  var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
  jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
    if (err) {
      res.send({
        err: true,
        msg: 'Invalid request'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

app.get('/getproducts', function (req, res) {
  console.log(req.decoded);
  product_model.find({}, function (err, docs) {
    if (!err) {
      console.log("products find!");
      console.log(docs);
      res.send(docs);
    }
  });
});

app.get('/findproduct', function (req, res) {
  console.log(req.query.code);
  product_model.findOne({"productCode": req.query.code}, function (err, product) {
    if (!err) {
      console.log("product match!");
      console.log(product);
      res.send(product);
    }
  });
});

app.post('/uploadFile', function (req, res) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = assets_new + UPLOAD_FOLDER;
  form.returnDir = UPLOAD_FOLDER;
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024;

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.send(err);
    }

    var extName = '';
    switch (files.imageUrl.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
      case 'image/gif':
        extName = 'gif';
        break;
    }

    if (extName.length == 0) {
      res.send({
        err: "Invalid Image Format."
      });
    }

    var fileName = uuidV1() + '.' + extName;
    var newPath = form.uploadDir + fileName;
    var returnPath = 'http://localhost:3000' + form.returnDir + fileName;

    fs.renameSync(files.imageUrl.path, newPath);

    res.send({"imageUrl": returnPath});
  });
});

app.post('/addproduct', function (req, res) {
  console.log(req.body);
  var new_product = product_model(req.body);
  new_product.save(function (err) {
    if (!err) {
      console.log(req.body);
      res.send({
        flg: true
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Sever running @ localhost:3000");
});
