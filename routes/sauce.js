const express = require('express');
const router = express.Router();
const saucesControll = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const inputController = require('../middleware/inputControl');

// création des différentes routes attendu par le front-end
router.get('/', saucesControll.getSauces);
router.get('/:id', auth, saucesControll.getSauce);
router.post('/', auth, multer, saucesControll.postSauces);
router.post('/:id/like', auth, auth, saucesControll.likeSauce);
router.put('/:id', auth, inputController, multer, saucesControll.putSauce);
router.delete('/:id', auth, saucesControll.deleteSauce);

module.exports = router;