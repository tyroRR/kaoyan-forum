const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title:String,
  pic:String,
  url:String,
  type:String,
  createTime:String
});
