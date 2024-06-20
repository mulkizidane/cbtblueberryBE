import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Exam from '../models/ExamModel.js';

export const checkAdminRole = (req, res, next) => {
    const userId = req.params.userId

    if(userId == "admin"){
        next()
    } else {
        res.status(403).json({msg: "Forbidden Admins Only"})
    }
};

export const verifyExamToken = async(req, res, next) => {
    const tokenId = req.params.tokenId
    const findData = await Exam.findOne({where: {exam_token: tokenId}})
    if(findData){
        next()
    } else {
        res.status(404).json({msg: "Token tidak valid"})
    }
}

export const hashPassword = async(user, options) => {
    if(user.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userType = decoded.type;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
}