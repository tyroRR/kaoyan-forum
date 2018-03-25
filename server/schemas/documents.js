const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  fileName:String,
  count:Number,
  type:String,
  createTime:String
});
