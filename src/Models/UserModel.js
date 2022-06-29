const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
    confirm: { type: String },
    termOfservice: { type: Boolean }
}, { versionKey: false })

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;