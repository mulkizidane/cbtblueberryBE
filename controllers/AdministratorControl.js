import Administrator from "../models/Administrator.js";
import xlsx from 'xlsx';
import { importDataFromExcel } from "../utils/importExcel.js";

export const getAllAdministrator = async(req, res) => {
    try {
        const allData = await Administrator.findAll();
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

export const getAdministratorByPk = async(req, res) => {
    
    try {
        const isAdminExsist = await Administrator.findByPk(req.userId, {
            attributes: {exclude: ['password']}
        })
        if(!isAdminExsist){
            return res.status(404).json({msg: "User not found"})
        }

        res.status(200).json({
            msg: "Successfully get data",
            status: "200",
            data_length: isAdminExsist.length,
            data: isAdminExsist,    
            method: req.method
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const addAdministratorData = async(req, res) => {
    try {
        const isUsernameExists = await Administrator.findAll({where: {username: req.body.username}})
        const isAdminNameExists = await Administrator.findAll({where: {admin_name: req.body.admin_name}})

        if(isAdminNameExists.length > 0){
            return res.status(200).json({msg: 'Admin name already exists'});
        }
        if(isUsernameExists.length > 0){
            return res.status(200).json({msg: 'Username already exists'});
        } 

        const newData = await Administrator.create(req.body)
        res.status(201).json({
            msg: "Successfully create data",
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
            res.status(500).json({msg: error.message});
        }
    }
}

export const importAdministratorFile = async(req, res) => {
    try {
        const filePath = req.file.path;
        const createdAdmin = await importDataFromExcel(filePath, Administrator);

        res.status(200).json({
            msg: "Successfully imported data from Excel file",
            status: "200",
            data: createdAdmin,
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

export const updateAdministrator = async(req, res) => {
    const adminId = req.params.adminId
    try {
        const isDataExsist = await Administrator.findAll({where: {id: adminId}})
        if(isDataExsist.length > 0){
            await Administrator.update(req.body, {
                where: {id: adminId},
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
        res.status(500).json({msg: error.message});
    }
}

export const deleteAdministrator = async(req, res) => {
    const adminId = req.params.adminId
    try {
        const isDataExsist = await Administrator.findAll({where: {id: adminId}})
        if(isDataExsist.length > 0){
            await Administrator.destroy({where: {id: adminId}})
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