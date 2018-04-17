const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title:String,
  content:String,
  sponsor:String,
  avatar:String,
  type:String,
  createTime:String,
  reply:[
    {
      username:String,
      content:String,
      createTime:String,
    }
  ]
});
