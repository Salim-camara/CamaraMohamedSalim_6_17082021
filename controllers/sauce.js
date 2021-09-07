// ******************************** CONTROLLEUR SAUCES *****************************
// Importation des prérequis
const Sauce = require('../models/sauce');
const fs = require('fs');

// création du middleware POST de la sauce
exports.postSauces = (req, res, next) => {
    const reqJS = JSON.parse(req.body.sauce);

    const sauce = new Sauce({
        name: reqJS.name,
        manufacturer: reqJS.manufacturer,
        description: reqJS.description,
        mainPepper: reqJS.mainPepper,
        heat: reqJS.heat,
        userId: reqJS.userId,
        // on aurait pu utilisé ...reqJS
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // Ajout du système de like
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
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

// modification d'une sauce avec PUT
exports.putSauce = (req, res, next) => {

    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).json({ message: 'objet modifié !' });
    })
    .catch((err) => {
        res.status(400).json(err);
    });
}

// suppression d'une sauce avec DELETE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'Sauce bien supprimé !'});
    })
            .catch((err) => {
                res.status(400).json(err);
    });
        })
    })
    .catch();
    
}

// système de like dislike
exports.likeSauce = (req, res, next) => {

    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id
    
    switch (like) {
      case 1 :
          Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }})
            .then(() => res.status(200).json({ message: `J'aime` }))
            .catch((error) => res.status(400).json({ error }));


          let nblike = 1;
          Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                nblike = sauce.usersLiked.length;
            })
            .catch((err) => {
                console.log(err);
            });

          Sauce.updateOne({ _id: sauceId }, { likes: nblike })
            .then(() => {
                console.log('nb like mise à jour');
            })
            .catch(() => {
                console.log('erreur nb like');
            }); 
              
      break;

      case -1 :
          Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }})
            .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
            .catch((error) => res.status(400).json({ error }))
      break;
  
      case 0 :
          Sauce.findOne({ _id: sauceId })
             .then((sauce) => {
              if (sauce.usersLiked.includes(userId)) { 
                Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }})
                  .then(() => res.status(200).json({ message: `Neutre` }))
                  .catch((error) => res.status(400).json({ error }))
              }
              if (sauce.usersDisliked.includes(userId)) { 
                Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }})
                  .then(() => res.status(200).json({ message: `Neutre` }))
                  .catch((error) => res.status(400).json({ error }))
              }
            })
            .catch((error) => res.status(404).json({ error }))
      break;
        
        default:
          console.log('erreur au niveau du switch');
    }
}