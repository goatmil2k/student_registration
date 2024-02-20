const express = require("express");
const { getAllStudents, registerNewStudent, addAcademicInfo, getAStudent, updateStudentInfo, deleteStudent, deleteARecord } = require("../controllers/functions");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const studentRoutes = express.Router();

studentRoutes.get('/', getAllStudents);
studentRoutes.get('/:id', getAStudent);
studentRoutes.post('/register', upload.single('photo'), registerNewStudent);
studentRoutes.put('/updatedata/:id', upload.single('photo'), updateStudentInfo);
studentRoutes.post('/addarecord/:id', addAcademicInfo)
studentRoutes.delete('/deletedata/:id', deleteStudent);
studentRoutes.delete('/deleterecord/:id', deleteARecord);

module.exports = studentRoutes;