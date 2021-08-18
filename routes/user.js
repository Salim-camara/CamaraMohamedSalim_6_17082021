const express = require('express');
const router = express.Router();
const userControll = require ('../controllers/user');

// création des différentes routes attendu par le front-end
router.post('/signup', userControll.signup);
router.post('/login', userControll.login);

module.exports = router;