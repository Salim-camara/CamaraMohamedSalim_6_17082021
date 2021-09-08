const fs = require('fs');

module.exports = {
    delete (imageUrl) {

        console.log(imageUrl);

        const filename = imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
            console.log('salut');
    
        })
    }
}