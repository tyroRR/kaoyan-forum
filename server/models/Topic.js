const mongoose = require('mongoose');
const topicsSchema = require('../schemas/topics');

module.exports = mongoose.model('Topic',topicsSchema);
