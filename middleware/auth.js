const token = require('jsonwebtoken');


module.exports = (req, res, next) => {
    
    try {
        const userToken = req.headers.authorization.split(' ')[1];
        console.log(userToken);
        const decodedToken = token.verify(userToken, 'CLEF_SECRETE');
        console.log(decodedToken);
        const userId = decodedToken.tokenUID;
        console.log(userId);
        if (req.body.userId == true && req.body.userId !== userId) {
            throw 'UserId non valable !'
        } else {
            console.log('authentification réussie !');
            // console.log(JSON.parse(req.body));
            next();
        }
    } catch (err) {
        res.status(401).json({ error: err | 'Requête non authentifiée'});
    }
}