// *********************************** CONTROLLERS USER **********************************
// importation des prerequis
const bcrypt = require('bcrypt');
const User = require('../models/user');
const token = require('jsonwebtoken');

// Création du middleware d'inscription
exports.signup = (req, res, next) => {
    console.log(req.body);
    // cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        // création d'un nouvel utilisateur dans la base de données
        const user = new User({
            email: req.body.email,
            password: hash,
            mistakes: 0,
            waitingTime: 0
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
                    // incrémentation du nb de faute
                    User.updateOne({ email: req.body.email }, { $inc: { mistakes: +1 } })
                        .then(() => {
                            res.status(400).json({ message : 'mot de passe incorrect'});
                        })
                        .catch();
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: token.sign(
                            { tokenUID: user._id },
                            'CLEF_SECRETE',
                            { expiresIn: '24h' }
                        ) 
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

