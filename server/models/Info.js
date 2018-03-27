const mongoose = require('mongoose');
const infoSchema = require('../schemas/infos');

module.exports = mongoose.model('Info',infoSchema);
