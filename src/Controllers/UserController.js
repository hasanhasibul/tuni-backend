const userModel = require('../models/userModel');

exports.createUser = (req, res) => {
    const reqBody = req.body;
    userModel.create(reqBody, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })

}
exports.userLogin = (req, res) => {
    const userName = req.body['email'];
    const password = req.body['password'];
    userModel.find({ userName: userName, password: password }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "fail", data: error })
        } else {
            if (data.length) {
                res.status(201).json({ status: "success", data: data })
            }
            else {
                res.status(401).json({ status: "fail", data: error })
            }

        }
    })
}