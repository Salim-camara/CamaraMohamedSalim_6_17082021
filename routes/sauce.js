const express = require('express');
const router = express.Router();
const saucesControll = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

// création des différentes routes attendu par le front-end
router.get('/', saucesControll.getSauces);
router.get('/:id', saucesControll.getSauce);
router.post('/', multer, saucesControll.postSauces);

module.exports = router;