const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: String,
    googleId: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', UserSchema);