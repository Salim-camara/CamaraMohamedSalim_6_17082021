const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // obligatiore
    name: { type: String, require: true},
    imageUrl: { type: String },
    userId: { type: String, require: true},
    // facultatif
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    heat: { type: String },
    likes: { type: String, require: true },
    dislikes: { type: String, require: true },
    usersLiked: { type: [String], require: true},
    usersDisliked: { type: [String], require: true}

});

module.exports = mongoose.model('sauce',  sauceSchema);