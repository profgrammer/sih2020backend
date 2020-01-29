const express = require('express');
const mongoose = require('mongoose');
const {signToken, verifyToken} = require('./jwtHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', (req, res) => {
    const profile = req.body.profileObj;
    const googleId = profile.googleId;
    User.findOne({googleId}).then(user1 => {
        console.log(user1);
        if(user1) {
            const token = signToken(user1.toJSON());
            res.json({token});
        } else {
            const newuser = new User();
            newuser._id = mongoose.Types.ObjectId(); 
            newuser.googleId = googleId;
            newuser.firstName = profile.givenName;
            newuser.lastName = profile.familyName;
            newuser.email = profile.email;

            newuser.save().then(user => {
                console.log(user);
                const token = signToken(user.toJSON());
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