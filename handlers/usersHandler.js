const express = require('express');
const {signToken, verifyToken} = require('./jwtHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', (req, res) => {
    const profile = req.body.profileObj;
    const googleId = profile.googleId;
    const user = User.findOne({googleId}).then(user => {
        if(user) {
            const token = signToken(user);
            res.json({token});
        } else {
            const newuser = new User();
            newuser._id = mongoose.Types.ObjectId(); 
            newuser.googleId = googleId;
            newuser.firstName = profile.givenName;
            newuser.lastName = profile.familyName;
            newuser.email = profile.email;

            newuser.save().then(user => {
                const token = signToken(user);
                res.json({token});
            })
        }
    })
})

router.post('/secret', verifyToken, (req, res) => {
    const token = req.token;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if(err) {
            res.json({
                success: false,
                message: 'invalid token'
            });
        }
        res.json({
            success:true,
            data
        });
    })

})

module.exports = router;