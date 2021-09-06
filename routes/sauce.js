const express = require('express');
const router = express.Router();
const saucesControll = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// création des différentes routes attendu par le front-end
router.get('/', saucesControll.getSauces);
router.get('/:id', auth, saucesControll.getSauce);
router.post('/', multer, saucesControll.postSauces);
router.post('/:id/like', auth, saucesControll.likeSauce);
router.put('/:id', saucesControll.putSauce);
router.delete('/:id', saucesControll.deleteSauce);

module.exports = router;