const express = require('express');
const userController = require('../controllers/userController')
const studentController = require('../Controllers/StudentController')

const router = express.Router();

// user api end point
router.post('/createUser', userController.createUser);
router.post('/userLogin', userController.userLogin);
router.post('/addStudent', studentController.addStudent);
router.get('/viewStudent', studentController.viewStudent);
router.post('/updateStudent', studentController.updateStudent);
router.post('/deleteStudent', studentController.deleteStudent);
router.post('/readStudentById', studentController.readStudentById);

// Student api end point




module.exports = router;