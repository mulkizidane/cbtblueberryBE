import express from 'express';
import { addExam, addExamConfig, deleteExam, generateToken, getAllChoices, getAllExam, getExamByClass, getExamByPk, getExamByToken, importExamFile } from '../controllers/ExamControl.js';
import { checkAdminRole, verifyExamToken } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import Exam from '../models/ExamModel.js';
const ExamRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({
    dest: path.join(__dirname, 'uploads/'),
})

ExamRouter.get('/exams', getAllExam)
ExamRouter.get('/all-exams', async(req, res) => {
    try {
        const findAll = await Exam.findAll({})
        
        res.status(200).json({
            msg: 'Successfully get all exam',
            status: '200',
            data: findAll,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
})
ExamRouter.get('/exams/:examId', getExamByPk)
ExamRouter.get('/exams/class/:classId/:tokenId', verifyExamToken, getExamByToken )
ExamRouter.get('/exams/class/:classId', getExamByClass)
ExamRouter.post('/exam', addExam)
ExamRouter.post('/exam/import', upload.single('file'), importExamFile)
ExamRouter.patch('/exam/:examId/generate-token', generateToken)
ExamRouter.patch('/exam/:examId/config', addExamConfig)
ExamRouter.get('/exam/:examId/questions/:questionId/choices', getAllChoices)
ExamRouter.delete('/:userId/exams/:examId',checkAdminRole, deleteExam)

export default ExamRouter;