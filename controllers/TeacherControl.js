import Teachers from "../models/TeacherModel.js";
import xlsx from 'xlsx';
import { importDataFromExcel } from "../utils/importExcel.js";

export const getAllTeachers = async(req, res) => {
    try {
        const allData = await Teachers.findAll();
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
        res.status(500).json({msg: error.message});
    }
}

export const getTeacherByPk = async(req, res) => {
    try {
        const isTeacherExsist = await Teachers.findByPk(req.userId, {
            attributes: { exclude: ['password'] }
        })
        if(!isTeacherExsist){
            return res.status(404).json({msg: "Invalid credentials"})
        }

        res.status(200).json({
            msg: "Successfully get data",
            status: "200",
            data_length: isTeacherExsist.length,
            data: isTeacherExsist,    
            method: req.method
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const importTeacherFile = async(req, res) => {
    try {
        const filePath = req.file.path;
        const createdTeachers = await importDataFromExcel(filePath, Teachers)
        res.status(200).json({
            msg: "Successfully imported data from Excel file",
            status: "200",
            data: createdTeachers,
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

export const addTeacherData = async(req, res) => {
    try {
        const isUsernameExists = await Teachers.findAll({where: {username: req.body.username}})
        const isNipExists = await Teachers.findAll({where: {nip: req.body.nip}})

        if(isUsernameExists.length > 0){
            return res.status(400).json({msg: 'Username already exists, try another username'});
        } 
        if(isNipExists.length > 0){
            return res.status(400).json({msg: 'NIP already exists, try another nip'});
        }

        const newData = await Teachers.create(req.body)
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

export const updateTeacher = async(req, res) => {
    const teacherId = req.params.teacherId
    try {
        const isDataExsist = await Teachers.findAll({where: {nip: teacherId}})
        if(isDataExsist.length > 0){
            await Teachers.update(req.body, {
                where: {nip: teacherId},
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

export const deleteTeacher = async(req, res) => {
    const teacherId = req.params.teacherId
    try {
        const isDataExsist = await Teachers.findAll({where: {nip: teacherId}})
        if(isDataExsist.length > 0){
            await Teachers.destroy({where: {nip: teacherId}})
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
        res.status(500).json({msg: error.message});
    }
}