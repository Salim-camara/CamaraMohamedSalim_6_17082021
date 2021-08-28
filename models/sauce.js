const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // obligatiore
    sauce: { type: String, require: true},
    image: { type: File, require: true},
    // facultatif
    manu: { type: String},
    desc: { type: String},
    ingredient: { type: String},
    heat: { type: Number}
});

module.exports = mongoose.model('sauce',  sauceSchema);