const mongoose = require('mongoose');
// Appel du plugin pour ne pas avoir plusieurs fois la même adresse mail
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true}
});

// Injection du plugin dans notre userSchema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user',  userSchema);
