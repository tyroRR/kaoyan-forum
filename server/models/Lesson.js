const mongoose = require('mongoose');
const lessonSchema = require('../schemas/lessons');

module.exports = mongoose.model('Lesson',lessonSchema);
