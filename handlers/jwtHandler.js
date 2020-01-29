const jwt = require('jsonwebtoken');

module.exports = {
    signToken: (user) => {
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
        return token;
    },

    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            
            req.token = token;

            next();
        }
        else {
            res.json({
                success: false,
                message: "no bearer header"
            })
        }
    }
}