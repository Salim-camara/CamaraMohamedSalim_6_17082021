// importation de prérequis
const express = require('express');
const app = express();
// importation de la route d'authentification
const userRoutes = require('./routes/user');



// connection à la base de donnée
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://salim:1234@cluster0.tzupg.mongodb.net/OpcProjet6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// création de la route vers la connexion des utilisateurs
app.use('/api/auth', userRoutes);












// expotation du fichier
module.exports = app;