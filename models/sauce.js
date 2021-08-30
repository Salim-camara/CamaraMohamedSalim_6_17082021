const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // obligatiore
    name: { type: String, require: true},
    userId: { type: String, require: true},
    // facultatif
    manufacturer: { type: String },
    description: { type: String, require: true },
    mainPepper: { type: String },
    heat: { type: String }

});

module.exports = mongoose.model('sauce',  sauceSchema);