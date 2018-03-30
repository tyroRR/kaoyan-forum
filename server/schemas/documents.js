const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  fileName:String,
  url:String,
  count:Number,
  type:String,
  createTime:String
});
