const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    name: { type: String },
    dob: { type: String },
    school: { type: String },
    sclass: { type: String },
    division: { type: String },
    uid: { type: String },
    status: { type: String }
}, { versionKey: false })

const studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;