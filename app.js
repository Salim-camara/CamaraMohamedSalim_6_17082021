// importation de prérequis
const express = require('express');
const app = express();

// connection à la base de donnée
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://salim:1234@cluster0.tzupg.mongodb.net/OpcProjet6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));












// expotation du fichier
module.exports = app;