const { inputRegex } = require('../services/configuration');
const Config = require('../services/configuration');


module.exports = (req, res) => {

    try {

        let entree = {
            name: req.name,
            desc: req.description,
            main: req.mainPepper,
            manu: req.manufacturer
        }

        console.log(entree.name);

        let allTest = true;

        const regex = Config.inputRegex;

        for (const input in entree) {

            if (regex.test(entree[input])) {

                allTest = false;
            } 
        }

        if (allTest === true) {
            console.log('tout est ok')
        } else {
            console.log('certains caractères ne sont pas valide');
            res.status(400).json({ message: 'certains caractères ne sont pas valide' });
        }

    } catch (err) {
        console.log(err);
    }
}