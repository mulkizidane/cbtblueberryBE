import Subject from "../models/SubjectModel.js";
import xlsx from 'xlsx';

export const getAllSubjects = async(req, res) => {
    try {
        const allSubjects = await Subject.findAll()
        res.status(200).json({
            status: '200',
            data_length: allSubjects.length,
            data: allSubjects,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const getSubjectByPk = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const importSubjectFile = async(req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        const createdSubjects = await Promise.all(data.map(async (subject) => {
            const { subject_code, subject_name } = subject;
            return await Subject.create({ subject_code, subject_name });
        }));

        res.status(200).json({
            msg: "Successfully imported subjects from Excel file",
            status: "200",
            data: createdSubjects,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const postSubject = async(req, res) => {
    const { subject_code, subject_name } = req.body;
    try {
        const createdSubject = await Subject.create({subject_code, subject_name});
        res.status(200).json({
            msg: "Successfully created a new subject",
            status: "200",
            data: createdSubject,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const updateSubject = async(req, res) => {
    const { subject_code, subject_name } = req.body;
    try {
        await Subject.update(
            {subject_code, subject_name}, 
            {where: {id: req.params.subjectId}}
        )

        res.status(200).json({
            msg: "Updated subject successfully",
        })
    } catch(err) {
        res.status(500).json({msg: err.message});
    }
}

export const deleteSubject = async(req, res) => {
    try {
        await Subject.destroy({where: {id: req.params.subjectId}});
        res.status(200).json({msg: "Subject was successfully deleted"});
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}