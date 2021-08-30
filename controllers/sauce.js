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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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