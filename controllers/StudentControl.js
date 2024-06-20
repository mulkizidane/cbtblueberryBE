import Students from "../models/StudentModel.js";
import { importDataFromExcel } from "../utils/importExcel.js";

export const getAllStudents = async(req, res) => {
    try {
        const allData = await Students.findAll();
        if(allData.length > 0){
            res.status(200).json({
                msg: "Successfully get all data",
                status: "200",
                data_length: allData.length,
                data: allData,
                method: req.method
            })
        } else {
            res.status(200).json({
                msg: "No data found",
                status: "200",
                data_length: allData.length,
                method: req.method
            })
        }
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

export const getStudentByPk = async(req, res) => {
    try {
        const student = await Students.findByPk(req.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }

        res.status(200).json({
            msg: "Successfully get data",
            status: "200",
            data_length: student.length,
            data: student,    
            method: req.method
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const importStudentFile = async(req, res) => {
    try {
        const filePath = req.file.path;
        const createdStudents = await importDataFromExcel(filePath, Students)
        res.status(200).json({
            msg: "Successfully imported data from Excel file",
            status: "200",
            data: createdStudents,
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

export const addStudentData = async(req, res) => {
    try {
        const isUsernameExists = await Students.findAll({where: {username: req.body.username}})
        const isNisExists = await Students.findAll({where: {nis: req.body.nis}})

        if(isUsernameExists.length > 0){
            return res.status(200).json({msg: 'Username already exists, try another username'});
        } 
        if(isNisExists.length > 0){
            return res.status(200).json({msg: 'NIS already exists, try another NIS'});
        }

        const newData = await Students.create(req.body)
        res.status(201).json({
            msg: "Successfully created data",
            status: "201",
            data_length: newData.length,
            data: newData,
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

export const updateStudent = async(req, res) => {
    const studentId = req.params.studentId
    try {
        const isDataExsist = await Students.findAll({where: {nis: studentId}})
        if(isDataExsist.length > 0){
            await Students.update(req.body, {
                where: {nis: studentId},
                individualHooks: true
            })
            res.status(200).json({
                msg: "Successfully updated data",
                status: "200",
                data_length: isDataExsist.length,
                method: req.method
            })
            return
        }
        return res.status(404).json({msg: "Data not found, try another id"})
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

export const deleteStudent = async(req, res) => {
    const studentId = req.params.studentId
    try {
        const isDataExsist = await Students.findAll({where: {nis: studentId}})
        if(isDataExsist.length > 0){
            await Students.destroy({where: {nis: studentId}})
            res.status(200).json({
                msg: "Successfully deleted data",
                status: "200",
                data_length: isDataExsist.length,
                method: req.method
            })
            return
        }
        return res.status(404).json({msg: "Data not found, try another id"})
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