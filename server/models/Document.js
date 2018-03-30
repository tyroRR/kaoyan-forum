const mongoose = require('mongoose');
const documentSchema = require('../schemas/documents');

module.exports = mongoose.model('Document',documentSchema);
