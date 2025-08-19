const jwt = require('jsonwebtoken');


    module.exports = (req, res, next) => {
    try {
        const fullToken = req.headers.authorization;
        const token = fullToken?.split(' ')[1]
       if(!token) {
            return res.status(403).json("Access denied");
        }
        const decoded = jwt.verify(token,"secretkey");
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

}