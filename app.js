// importation de prérequis
const express = require('express');
const app = express();

// construction de middlewar
app.post('/api/auth/signup', (req, res, next) => {
    console.log('salut');
})










// expotation du fichier
module.exports = app;