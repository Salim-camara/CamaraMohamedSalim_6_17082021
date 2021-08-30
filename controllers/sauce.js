// ******************************** CONTROLLEUR SAUCES *****************************
// Importation des prérequis
const Sauce = require('../models/sauce');

// création du middleware POST de la sauce
exports.postSauces = (req, res, next) => {
    console.log(req.body.sauce);

    const sauce = new Sauce({
        name: '',
        description: '',
        userId : '',
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' ']
    });
    sauce.save()
    .then(() => {
        res.status(201).json({ message: 'votre sauce a bien été créée !'});
    })
    .catch((error) => {
        res.status(500).json({ message : 'erreur' });
    })
    return;
}

// création du middleware GET des sauces
exports.getSauces = (req, res, next) => {
    Sauce.find()
    .then(() => {
        res.status(200).json({ message: 'toutes les sauces sont là !'});
    })
    .catch(() => {
        res.status(404).json({ message: 'les sauces nont pas été trouvées'});
    });
}