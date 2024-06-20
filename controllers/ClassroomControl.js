import xlsx from 'xlsx';
import Classroom from "../models/Classroom.js";

export const getAllClassroom = async(req, res) => {
    try {
        const allData = await Classroom.findAll();
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

export const getClassroomByPk = async(req, res) => {
    try {
        const selectedData = await Classroom.findByPk(req.params.classId);
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

export const uploadClassroom =  async(req, res) => {
    try {
        const newData = await Classroom.create(req.body)
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

export const importClassroom = async(req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        const createdSubjects = await Promise.all(data.map(async (cls) => {
            const { class_code, class_level, class_name } = cls;
            return await Classroom.create({ class_code, class_level, class_name });
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

export const updateClassroom = async(req, res) => {
    try {
        const isDataExist = await Classroom.findByPk(req.params.classId)
        if(!isDataExist){
            res.status(404).json({msg: "No Data Found"})
            return
        }
        const updatedData = await Classroom.update(req.body, {where: {id: req.params.classId}})
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



export const deleteClassroom = async(req, res) => {
    try {
        const isDataExist = await Classroom.findByPk(req.params.classId)
        if(!isDataExist){
            res.status(404).json({msg: "No Data Found"})
            return
        }

        const deletedData  = await Classroom.destroy({where: {id: req.params.classId}})
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