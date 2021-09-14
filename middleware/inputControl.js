const { inputRegex } = require('../services/configuration');
const Config = require('../services/configuration');


module.exports = (req, res, next) => {

    try {
        let entree = {
            name: req.body.name,
            desc: req.body.description,
            main: req.body.mainPepper,
            manu: req.body.manufacturer
        }

        let allTest = true;

        const regex = /.{8,}/;

        for (const input in entree) {

            if (regex.test(input) === false) {

                allTest = false;
            } 
        }
        console.log(entree.name);
        console.log(allTest);

        if (allTest === true) {
            res.status(200).json({ message: 'c good'});
            next();
        } else {
            console.log('problème au niveau du next');
        }

    } catch (err) {
        console.log(err);
    }
}