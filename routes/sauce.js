const express = require('express');
const router = express.Router();
const saucesControll = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// création des différentes routes attendu par le front-end
router.get('/', auth, saucesControll.getSauces);
router.get('/:id', auth, saucesControll.getSauce);
router.post('/', auth, multer, saucesControll.postSauces);

module.exports = router;