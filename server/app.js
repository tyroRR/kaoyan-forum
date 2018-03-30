const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();

const  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + `/public/uploads/files`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.all('*', function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials",true); //带cookies
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//app.use('/admin',require('./router/admin'));
app.use('/api',require('./router/api'));
//app.use('/',require('./router/main'));

mongoose.connect('mongodb://localhost/',err=>{
  if(err){
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功');
    app.listen(8081);
  }
});

