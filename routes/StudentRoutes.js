import express from 'express';
import { addStudentData, deleteStudent, getAllStudents, getStudentByPk, importStudentFile, updateStudent } from '../controllers/StudentControl.js';
import { checkAdminRole, verifyToken } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import Students from '../models/StudentModel.js';
import ExamResult from '../models/ExamResultModel.js';
import QuestionRes from '../models/QuestionResModel.js'
const StudentRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

StudentRouter.get('/students', getAllStudents)
StudentRouter.get('/student',verifyToken, getStudentByPk)
StudentRouter.get('/student/exam-results', async(req, res) => {
    try {
        const findData = await Students.findAll({
            include: [{
                model: ExamResult,
                include: [QuestionRes]
            }]
        })

        res.status(200).json({
            msg: 'Succcessfully get all data',
            status: "200",
            data: findData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
StudentRouter.get('/student/:userId/exam-results', async(req, res) => {
    try {
        const findStudent = await Students.findByPk(req.params.userId, {
            include: [{
                model: ExamResult,
                include: [QuestionRes]
            }]
        })

        res.status(200).json({
            msg: "Successfully get user with exam results",
            status: '200',
            data: findStudent,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})
StudentRouter.post('/:userId/students',checkAdminRole, addStudentData)
StudentRouter.post('/:userId/students/import',checkAdminRole, upload.single('file'), importStudentFile)
StudentRouter.patch('/:userId/students/:studentId',checkAdminRole, updateStudent)
StudentRouter.delete('/:userId/students/:studentId',checkAdminRole, deleteStudent)

export default StudentRouter;