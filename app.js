// importation de prérequis
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// importation de la route d'authentification
const userRoutes = require('./routes/user');



// autorisation de toutes du CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
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