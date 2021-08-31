const token = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const userToken = req.headers.authorization.split(' ')[1];
        const decodedToken = token.verify(userToken, 'CLEF_SECRETE');
        const userId = decodedToken.userId;
        if (req.body.userId == true && req.body.userId !== userId) {
            throw 'UserId non valable !'
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({ error: err | 'Requête non authentifiée'});
    }
}