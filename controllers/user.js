// *********************************** CONTROLLERS USER **********************************
// importation des prerequis
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Création du middleware d'inscription
exports.signup = (req, res, next) => {
    console.log(req.body);
    // cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        // création d'un nouvel utilisateur dans la base de données
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // sauvegarde dans la BDD
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
    // comparaison des données avec la BDD
    User.findOne({ email: req.body.email})
    .then((user) => {
        if (!user) {
            return res.status(401).json({ message: "utilisateur non trouvé !"});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then((password) => {
                if (!password) {
                    return res.status(401).json({ message: "Mot de passe incorrect !"});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN' 
                    })
                }
            })
            .catch(() => {
                res.status(500).json({ message: 'erreur inconnue'});
            });
        }

    })
    .catch(() => {
        res.status(500).json({ message: 'erreur inconnue !'});
    });
};

