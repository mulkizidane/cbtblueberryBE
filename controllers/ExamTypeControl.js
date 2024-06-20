import ExamType from "../models/ExamTypeModel.js";
import xlsx from 'xlsx';

export const getAllExamType = async(req, res) => {
    try {
        const allData = await ExamType.findAll();
        res.status(200).json({
            msg: "Successfull get all data",
            status: "200",
            data_length: allData.length,
            data: allData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getExamTypeByPk = async(req, res) => {
    try {
        const selectedData = await ExamType.findByPk(req.params.examTypeId);
        if(selectedData){
            res.status(200).json(
                {
                    msg: "Successfully get data by pk",
                    status: "200",
                    data_length: selectedData.length,
                    data: selectedData,
                    method: req.method
                }
            )
        } else {
            res.status(404).json({msg: "No Data Found"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const uploadExamType =  async(req, res) => {
    try {
        const newData = await ExamType.create(req.body)
        res.status(200).json({
            msg: "Successfully uploaded",
            status: "200",
            data_length: newData.length,
            data: newData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const importExamType = async(req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        const createdSubjects = await Promise.all(data.map(async (exam) => {
            const { exam_code, exam_type, exam_name } = exam;
            return await ExamType.create({ exam_code, exam_type, exam_name });
        }));

        res.status(200).json({
            msg: "Successfully imported data from Excel file",
            status: "200",
            data: createdSubjects,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateExamType = async(req, res) => {
    try {
        const isDataExist = await ExamType.findByPk(req.params.examTypeId)
        if(!isDataExist){
            res.status(404).json({msg: "No Data Found"})
            return
        }
        const updatedData = await ExamType.update(req.body, {where: {id: req.params.examTypeId}})
        res.status(200).json({
            msg: "Successfully updated data",
            status: "200",
            data_length: updatedData.length,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const deleteExamType = async(req, res) => {
    try {
        const isDataExist = await ExamType.findByPk(req.params.examTypeId)
        if(!isDataExist){
            res.status(404).json({msg: "No Data Found"})
            return
        }

        const deletedData  = await ExamType.destroy({where: {id: req.params.examTypeId}})
        res.status(200).json({
            msg: "Data deleted successfully",
            status: "200",
            data_length: deletedData.length,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}