const fs = require('fs');
const { url } = require('inspector');

// Supression d'image
module.exports = {
    delete (imageUrl) {

        console.log(imageUrl);

        const filename = imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
            console.log('salut');
    
        })
    },

    url (req) {
        return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
}
