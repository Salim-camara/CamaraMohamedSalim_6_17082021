const express = require('express');
const router = express.Router();
const userControll = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

// création des différentes routes attendu par le front-end
router.get('/', userControll.getSauces);
router.post('/', multer, userControll.postSauces);

module.exports = router;