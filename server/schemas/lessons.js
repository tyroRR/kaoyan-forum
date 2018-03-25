const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title:String,
  url:String,
  type:String,
  createTime:String
});
