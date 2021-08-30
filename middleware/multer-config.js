const multer = require('multer');
// tableau traducteur d'extension
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    // route vers laquelle seront mis les images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // construction de la racine du nom
        const name = file.originalname.split(' ').join('_');
        // construction de l'extension du nom
        const extension = MIME_TYPES[file.mimetype];
        // construction du nom final
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');