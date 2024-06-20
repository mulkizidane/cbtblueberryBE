import db from "../config/Database.js";
import Choices from "../models/ChoiceModel.js";
import Exam from "../models/ExamModel.js";
import Questions from "../models/QuestionModel.js";
import { importDataFromExcel } from "../utils/importExcel.js";
import crypto from 'crypto';

export const getAllExam = async(req, res) => {
    try {
        const findAll = await Exam.findAll({
            include: [{
                model: Questions,
                include: [Choices]
            }]
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
}

export const getExamByPk = async(req, res) => {
    try {
        const selectedData = await Exam.findByPk(req.params.examId, {
            include: [{
                model: Questions,
                include: [Choices]
            }]
        })
        if (selectedData && selectedData.Questions) {
            selectedData.Questions.forEach(question => {
                if (question.image) {
                    question.image = question.image.toString('base64');
                }
            });
        }
        res.status(200).json(selectedData)
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const getExamByClass = async(req, res) => {
    try {
        const selectedData = await Exam.findAll({where: {class: req.params.classId}})
        if(selectedData.length === 0){
            return res.status(404).json({msg: 'No exam found for class'+req.params.classId})
        }
        res.status(200).json({
            data: selectedData
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const getExamByToken = async(req, res) => {
    try {
        const selectedData = await Exam.findAll({
            where: {exam_token: req.params.tokenId}, 
            include: [{
                model: Questions,
                include: [Choices]
            }]
        })
        if(selectedData.length === 0){
            return res.status(404).json({msg: 'No exam found for class'+req.params.classId})
        }
        res.status(200).json({
            status: "200",
            msg: "Validasi token berhasil",
            data: selectedData,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const addExam = async(req, res) => {
    const transaction = await db.transaction();
    try {
        const exam = await Exam.create(req.body, {transaction})

        await transaction.commit();
        res.status(200).json({
            msg: 'Successfully created exam',
            status: '200',
            data: exam,
            method: req.method
        })
    } catch(err){
        await transaction.rollback();
        if (err.name === 'SequelizeValidationError') {
            const firstError = err.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(err);
            res.status(500).json({msg: err.message});
        }
    }
}

export const addExamConfig = async(req, res) => {
    const examId = req.params.examId;
    try {
        const isDataExsist = await Exam.findAll({where: {exam_code: examId}})
        if(!isDataExsist){
            return res.status(404).json({ msg: "Kode bank soal tidak ditemukan" });
        }

        const extraConfig = await Exam.update(req.body, { where: {exam_code: examId} })

        res.status(201).json({
            status: "201",
            msg: "Successfully updated new data "+examId,
            method: req.method
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(err);
            res.status(500).json({msg: error.message});
        }
    }
}


export const importExamFile = async(req, res) => {
    try {
        const filePath = req.file.path;
        const createdExam = await importDataFromExcel(filePath, Exam)
        res.status(200).json({
            msg: "Successfully imported data from Excel file",
            status: "200",
            data: createdExam,
            method: req.method
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }
}

export const generateToken = async (req, res) => {
    try {
        const { examId } = req.params;
        const token = crypto.randomBytes(8).toString('hex'); 
        const exam = await Exam.findOne({ where: { exam_code: examId } });
        if (!exam) {
            return res.status(404).json({ msg: "Kode bank soal tidak ditemukan" });
        }
        exam.update({...exam, exam_token: token})
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
}



export const getAllChoices = async(req, res) => {
    try {
        const findById = await Choices.findAll({where: {questionId: req.params.questionId}})
        res.status(200).json({
            msg: 'Successfully found choices',
            status: '200',
            data: findById,
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
}

export const deleteExam = async(req, res) => {
    const examId = req.params.examId;
    try {
        const questions = await Questions.findAll({ where: { examId } });
        if (questions.length > 0) {
            await Questions.destroy({ where: { examId }});
        }

        await Exam.destroy({ where: { exam_code: examId }});
        res.status(200).json({msg: 'Successfully deleted data '+req.params.examId})
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}