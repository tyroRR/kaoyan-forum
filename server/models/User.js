const mongoose = require('mongoose');
const usersSchema = require('../schemas/users');

modules.export = mongoose.model('User',usersSchema);
