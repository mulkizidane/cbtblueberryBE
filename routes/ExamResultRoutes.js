import express from 'express';
import ExamResult from '../models/ExamResultModel.js';
import QuestionRes from '../models/QuestionResModel.js';
import ExcelJS from 'exceljs';
import xlsx from 'xlsx';
import Students from '../models/StudentModel.js';
const ExResultRouter = express.Router();

ExResultRouter.get('/:userId/exam-results', async(req, res) => {
    const userId = req.params.userId;
    try {
        const allData = await ExamResult.findAll({
            where: {userId: userId},
            include: [{
                model: QuestionRes
            }]
        })
        res.status(200).json({
            msg: "Successfully get all exam results",
            status: "200",
            data_length: allData.length,
            data: allData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

ExResultRouter.get('/exam-results/export', async (req, res) => {
    try {
        const students = await Students.findAll({
            include: {
                model: ExamResult,
                as: 'ExamResults',
            }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Exam Results');

        worksheet.columns = [
            { header: '#', key: 'index', width: 5 },
            { header: 'NIM', key: 'nis', width: 10 },
            { header: 'Nama', key: 'name', width: 20 },
            { header: 'Kelas', key: 'class', width: 10 },
            { header: 'Mapel', key: 'subject', width: 15 },
            { header: 'Tanggal Ujian', key: 'exam_date', width: 15 },
            { header: 'Total Nilai', key: 'total_grade', width: 10 },
            { header: 'Nilai KKM', key: 'passing_score', width: 10 },
            { header: 'Keterangan', key: 'information', width: 15 },
        ];

        students.forEach((student, index) => {
            student.ExamResults.forEach(examResult => {
                worksheet.addRow({
                    index: index + 1,
                    nis: student.nis,
                    name: student.name,
                    class: student.class,
                    subject: examResult.subject,
                    exam_date: examResult.exam_date,
                    total_grade: examResult.total_grade,
                    passing_score: examResult.passing_score,
                    information: examResult.information,
                });
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'ExamResults.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating Excel file');
    }
})

ExResultRouter.post('/:userId/exam-results', async(req, res) => {
    try {
        const addData = await ExamResult.create(req.body, {where: {userId: req.params.userId}})
        res.status(200).json({
            msg: "Successfully get all exam results",
            status: "200",
            data_length: addData.length,
            data: addData,
            method: req.method
        }) 
    } catch (error) {
        res.status(500).json({msg: error.message})      
    }
})

ExResultRouter.post('/:userId/exam-results/questions', async(req, res) => {
    try {
        const questionsData = req.body.map(question => ({
            ...question,
            examResId: req.params.userId
        }));

        const postData = await QuestionRes.bulkCreate(questionsData);
        res.status(200).json({
            msg: "Successfully add questions to exam results",
            status: "200",
            data_length: postData.length,
            data: postData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

export default ExResultRouter;