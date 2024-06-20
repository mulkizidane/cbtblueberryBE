import db from "../config/Database.js";
import Choices from "../models/ChoiceModel.js";
import Exam from "../models/ExamModel.js";
import Questions from "../models/QuestionModel.js";

export const getAllQuestions = async(req, res) => {
    try {
        const findQuestion = await Questions.findAll({where: {examId: req.params.examId}})

        res.status(200).json({
            msg: 'Successfully found all questions',
            status: '200',
            data: findQuestion,
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

export const getQuestionByPk = async(req, res) => {
    try {
        const findByNum = await Questions.findAll({where: {no_question: req.params.questionNo, examId: req.params.examId}})
        res.status(200).json({
            msg: 'Successfully found 1 questions',
            status: '200',
            data: findByNum,
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

export const addExamQuestion = async(req, res) => {
    const examId = req.params.examId;
    const { no_question, question_type, question, correct_answer } = JSON.parse(req.body.questions);
    const choices = JSON.parse(req.body.choices);
    const image = req.file ? req.file.buffer : null;
    const transaction = await db.transaction();
    try {
        const exams = await Exam.findOne({ where: { exam_code: examId } });
        const questions = await Questions.findAll({ where: { examId: examId } });
        const isSameNo = await Questions.findOne({ where: { no_question: req.params.questionNo, examId: examId } });
        if (isSameNo) {
            await transaction.rollback();
            return res.status(409).json({ msg: 'Number already exists, please try another question number' });
        }
        const newQuestion = await Questions.create(
            {
                no_question,
                question_type,
                question,
                correct_answer,
                examId,
                image
            },
            { transaction }
        );

        if(newQuestion.question_type !== 'ESSAY'){
            const filteredQuestion = questions.filter(q => q.question_type !== 'ESSAY')

            if(filteredQuestion.length >= exams.total_multiple_choices ){
                await transaction.rollback()
                return res.status(400).json({msg: `Maksimal ujian ini hanya ${exams.total_multiple_choices} pilihan ganda, silahkan membuat soal lain`})
            }

            const choicesWithQuestionId = choices.map(choice => ({
                ...choice,
                questionId: newQuestion.id,
            }));
            await Choices.bulkCreate(choicesWithQuestionId, { transaction });
            await transaction.commit();

            res.status(200).json({
                msg: 'Question and choices created successfully',
                status: '200',
                data: { newQuestion, choices: choicesWithQuestionId },
                method: req.method
            });
        } else {
            const filteredQuestion = questions.filter(q => q.question_type == "ESSAY")
            
            if(filteredQuestion.length >= exams.total_essay ){
                await transaction.rollback()
                return res.status(400).json({msg: `Maksimal ujian ini hanya ${exams.total_essay} Essay, silahkan membuat soal lain`})
            }

            await transaction.commit();
            return res.status(200).json({
                msg: 'Question created successfully',
                status: '200',
                data: { newQuestion },
                method: req.method
            });
        }
    } catch (error) {
        await transaction.rollback();
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }

}