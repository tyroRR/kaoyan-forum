const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/admin',require('./router/admin'));
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

