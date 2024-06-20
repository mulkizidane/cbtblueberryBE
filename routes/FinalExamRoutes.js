import express from 'express';
import crypto from 'crypto';
import Exam from '../models/ExamModel.js';
import FinalExam from '../models/FinalExamModel.js';
import Questions from '../models/QuestionModel.js';
import Choices from '../models/ChoiceModel.js';
const FinalExamRouter = express.Router();

FinalExamRouter.get('/final-exam/:examCode', async(req, res) => {
    try {
        const findAll = await FinalExam.findAll({
            include: [{
                model: Exam,
                include: [Questions]
            }],
            where: { exam_code: req.params.examCode }
        })
        
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

FinalExamRouter.post('/final-exam', async(req, res) => {
    try {
        const exam = await FinalExam.create(req.body)

        res.status(200).json({
            msg: 'Successfully created final exam',
            status: '200',
            data: exam,
            method: req.method
        })
    } catch(err){
        if (err.name === 'SequelizeValidationError') {
            const firstError = err.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }
})

FinalExamRouter.post('/final-exam/:examCode/generate-token', async (req, res) => {
    try {
        const { examCode } = req.params;
        const token = crypto.randomBytes(8).toString('hex'); 
        const exam = await FinalExam.findOne({ where: { exam_code: examCode } });
        if (!exam) {
            return res.status(404).json({ msg: "Kode bank soal tidak ditemukan" });
        }
        exam.exam_token = token;
        await exam.save();
        res.status(200).json({ msg: "Token generated successfully", token });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const firstError = err.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }
})

export default FinalExamRouter;