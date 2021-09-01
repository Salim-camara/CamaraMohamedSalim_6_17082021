// ******************************** CONTROLLEUR SAUCES *****************************
// Importation des prérequis
const Sauce = require('../models/sauce');

// création du middleware POST de la sauce
exports.postSauces = (req, res, next) => {
    const reqJS = JSON.parse(req.body.sauce);

    const sauce = new Sauce({
        name: reqJS.name,
        manufacturer: reqJS.manufacturer,
        description: reqJS.description,
        mainPepper: reqJS.mainPepper,
        heat: reqJS.heat,
        // on aurait pu utilisé ...reqJS
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // Ajout du système de like
        like: 0,
        dislike: 0,
        usersLiked: [''],
        usersDisliked: ['']
    });
    sauce.save()
    .then(() => {
        res.status(201).json({ message: 'votre sauce a bien été créée !'});
    })
    .catch((error) => {
        res.status(500).json({ message : 'erreur' });
    })
    return;
    next();
}

// création du middleware GET des sauces
exports.getSauces = (req, res, next) => {
    Sauce.find()
    .then((sauce) => {
        res.status(200).json(sauce);
    })
    .catch(() => {
        res.status(404).json({ message: 'les sauces nont pas été trouvées'});
    });
}

// création di middleware GET d'une seule sauce
exports.getSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        res.status(200).json(sauce);
    })
    .catch((err) => {
        res.status(404).json(err);
    });
}

// modification d'une sauce
exports.putSauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).json({ message: 'objet modifié !' });
    })
    .catch((err) => {
        res.status(400).json(err);
    });
}

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({ message: 'Sauce bien supprimé !'});
    })
    .catch((err) => {
        res.status(400).json(err);
    });
}