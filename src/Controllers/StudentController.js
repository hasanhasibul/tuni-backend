const SudentsModel = require('../Models/SudentsModel');
exports.addStudent = (req, res) => {
    const name = req.body['name'];
    const dob = req.body['dob'];
    const school = req.body['school'];
    const sclass = req.body['sclass'];
    const division = req.body['division'];
    const status = req.body['status'];
    const uid = Math.floor(Math.random() * 10);

    const milliDay = 1000 * 60 * 60 * 24; // a day in milliseconds;
    const ageInDays = (new Date() - new Date(dob)) / milliDay;
    const ageInYears = Math.floor(ageInDays / 365);

    const reqBody = {
        name: name,
        dob: ageInYears,
        school: school,
        sclass: sclass,
        division: division,
        status: status,
        uid: uid,
    }
    SudentsModel.create(reqBody, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })

}

exports.viewStudent = (req, res) => {
    SudentsModel.find({}, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })
}

exports.readStudentById = (req, res) => {
    const id = req.body.id;
    SudentsModel.find({ _id: id }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })
}

exports.updateStudent = (req, res) => {
    const id = req.body['id'];
    const name = req.body['name'];
    const dob = req.body['dob'];
    const school = req.body['school'];
    const sclass = req.body['sclass'];
    const division = req.body['division'];
    const status = req.body['status'];
    const milliDay = 1000 * 60 * 60 * 24; // a day in milliseconds;
    const ageInDays = (new Date() - new Date(dob)) / milliDay;
    const ageInYears = Math.floor(ageInDays / 365);
    const reqBody = {
        name: name,
        dob: ageInYears,
        school: school,
        sclass: sclass,
        division: division,
        status: status
    }
    SudentsModel.updateOne({ _id: id }, { $set: reqBody }, { upsert: true }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })
}

exports.deleteStudent = (req, res) => {
    const id = req.body['id'];

    SudentsModel.deleteOne({ _id: id }, { upsert: true }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "delete success", data: data })
        }
    })
}

exports.searchStudent = (req, res) => {
    const name = req.body['name'];
    const age = req.body['age'];
    const division = req.body['division'];
    const sclass = req.body['sclass'];
    const school = req.body['school'];
    SudentsModel.aggregate([
        {
            $match: { $or: [{ name: name }, { dob: age }, { division: division }, { sclass: sclass }, { school: school }] }
        }
    ]).then(response => {
        res.status(201).json({ status: "success", data: response })
    })
        .catch((error) => {
            res.status(401).json({ status: "fail", data: error })
        })
}