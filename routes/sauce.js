const express = require('express');
const router = express.Router();
const userControll = require('../controllers/sauce');

// création des différentes routes attendu par le front-end
router.get('/', userControll.getSauces);
router.post('/', userControll.postSauces);

module.exports = router;