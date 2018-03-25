const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
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

