const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title:String,
  content:String,
  sponsor:String,
  avatar:String,
  type:String,
  createTime:String
});
