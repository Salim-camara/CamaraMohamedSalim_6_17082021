const token = require('jsonwebtoken');


module.exports = (req, res, next) => {

    console.log('hello');
    console.log(req.method);
    console.log(req.body);
    
    try {
        const userToken = req.headers.authorization.split(' ')[1];
        const decodedToken = token.verify(userToken, 'CLEF_SECRETE');
        const userId = decodedToken.tokenUID;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valable !'
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({ error: err | 'Requête non authentifiée'});
    }
}