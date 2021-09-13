// *********************************** CONTROLLERS USER **********************************
// importation des prerequis
const bcrypt = require('bcrypt');
const User = require('../models/user');
const token = require('jsonwebtoken');
const { all } = require('../routes/user');

// Création du middleware d'inscription
exports.signup = (req, res, next) => {
    const REGEX = [
        {
            regex: /(?=.*[0-9])/,
            error: 'le mot de passe doit contenir au moins 1 chiffre'
        },

        {
            regex: /(?=.*[!@#$%^&*])/,
            error: 'le mot de passe doit contenir au moins 1 caractère spécial'
        },

        {
            regex: /.{8,}/,
            error: 'le mot de passe doit contenir au moins 8 caractère'
        }
    ]

    const passW = req.body.password;
    let allTest = true;
    
    // vérification de la qualité du mot de passe
    for (const rules of REGEX) {
        
        if(rules.regex.test(passW) === false) {
            res.status(400).json({ message: rules.error });
            allTest = false;
        }
    }

    if (allTest === true) {
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
                    res.status(500).json({ error, message : 'erreur 500' })
                });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
    
};

// Création middleware de connexion
exports.login = (req, res, next) => {
    // comparaison des données avec la BDD
    User.findOne({ email: req.body.email})
    .then((user) => {
        if (!user) {
            return res.status(401).json({ message: "utilisateur non trouvé !"});
        } else {
            // test du nb d'erreur
            User.findOne({ email: req.body.email })
                .then((user) => {
                    // developpement du test du date now
                    if (user.waitingTime > Date.now()) {
                        res.status(401).json({ message: 'il faut attendre !'});
                        console.log('il faut attendre');
                    } else {

                        if (user.mistakes >= 3) {
                            // ******************bloquage du compte*******************************
                            User.updateOne({ email: req.body.email }, { waitingTime: Date.now() + 60000 })
                                .then(() => {
                                    User.updateOne({ email: req.body.email }, { mistakes: 0 })
                                        .then(() => res.status(401).json({ message: 'compte bloqué pour 2 minutes'}))
                                        .catch();
                                })
                                .catch();    
                        } else {
                            // *************************accès au compte*****************************
                            bcrypt.compare(req.body.password, user.password)
                                .then((password) => {
                                    if (!password) {
                                        // incrémentation du nb de faute
                                        User.findOne({ email: req.body.email }) 
                                            .then((user) => {
                                                let newMis = user.mistakes + 1;
                                                console.log(newMis);
                                                User.updateOne({ email: req.body.email }, { mistakes: newMis })
                                                    .then(() => {
                                                        res.status(400).json({ message : 'mot de passe incorrect'});
                                                    })
                                                    .catch();

                                            })
                                            .catch();

                                    } else {
    
                                        User.updateOne({ email: req.body.email }, { mistakes: 0 })
                                            .then(() => {
                                                res.status(200).json({
                                                    userId: user._id,
                                                    token: token.sign(
                                                        { tokenUID: user._id },
                                                        'CLEF_SECRETE',
                                                        { expiresIn: '24h' }
                                                    ) 
                                                })
                                            })
                                            .catch();
                                    }
                                })
                        }
                    // 
                    }
                })
                .catch();
        }
    })
    .catch(() => {
        res.status(404).json({ message: 'utilisateur introuvable'});
    });
};

