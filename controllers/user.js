// *********************************** CONTROLLERS USER **********************************
// importation des prerequis
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Création du middleware d'inscription
exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => {
            res.status(201).json({ message: 'utilisateur créé !'})
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

// Création middleware de connexion
exports.login = (req, res, next) => {

};

