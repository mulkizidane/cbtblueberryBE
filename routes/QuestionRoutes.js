import express from 'express';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import { addExamQuestion, getAllQuestions, getQuestionByPk } from '../controllers/QuestionControl.js';
import Questions from '../models/QuestionModel.js';
const QuestionRouter = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.memoryStorage();
const upload = multer({
    dest: path.join(__dirname, 'uploads/'),
    storage: multer.memoryStorage()
})

QuestionRouter.get('/exam/:examId/questions', getAllQuestions)
QuestionRouter.get('/exam/:examId/question/:questionNo', getQuestionByPk)
QuestionRouter.delete('/exam/:examId/question/:questionNo', async(req, res) => {
    const questionNo = req.params.questionNo;
    const examId = req.params.examId;
    try {
        const findByNum = await Questions.findAll({where: {no_question: questionNo, examId: examId}})
        if(findByNum.length === 0){
            return res.status(404).json({msg: 'No question found'})
        }
        await Questions.destroy({where: {no_question: questionNo, examId: examId}})
        res.status(200).json({
            status: "200",
            msg: 'Successfully deleted id : '+questionNo,
            method: req.method
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }
})
QuestionRouter.post('/exam/:examId/question/:questionNo', upload.single('image'), addExamQuestion)

export default QuestionRouter;
