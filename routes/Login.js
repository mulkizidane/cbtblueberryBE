import express from 'express';
import Students from '../models/StudentModel.js';
import Administrator from '../models/Administrator.js';
import Teachers from '../models/TeacherModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()
const LoginRouter = express.Router();
const secretKey = process.env.JWT_SECRET

const generateToken = (user, type) => {
    return jwt.sign(
        { id: user.id, username: user.username, type },
        secretKey,
        { expiresIn: '1h' }
    );
};

LoginRouter.post('/login-siswa', async(req, res) => {
    const { username, password } = req.body;

    try {
        const isStudent = await Students.findOne({where: {username: username}})

        if(!isStudent){
            return res.status(404).json({ msg: 'Username not found' })
        }

        const isMatch = await bcrypt.compare(password, isStudent.password)
        if(!isMatch){
            return res.status(401).json({ msg: 'Invalid credential' })
        }

        const token = jwt.sign(
            { id: isStudent.nis, username: isStudent.username, type: 'student' },
            secretKey,
            { expiresIn: '1h' }
        );
        return res.json({ message: 'Successfully Login', token });
    } catch(err){
        res.status(500).json({msg: err.message})
    }
})

LoginRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const isAdmin = await Administrator.findOne({ where: { username: username } });
        if (isAdmin) {
            const isMatch = await bcrypt.compare(password, isAdmin.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid password' });
            }
            const token = generateToken(isAdmin, 'admin');
            return res.json({ message: 'Successfully logged in as admin', token });
        }

        const isTeacher = await Teachers.findOne({ where: { username: username } });
        if (isTeacher) {
            const isMatch = await bcrypt.compare(password, isTeacher.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid password' });
            }
            const token = jwt.sign(
                { id: isTeacher.nip, username: isTeacher.username, type: 'teacher' },
                secretKey,
                { expiresIn: '1h' }
            );
            return res.json({ message: 'Successfully logged in as teacher', token });
        }

        return res.status(404).json({ msg: 'Username not found' });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


export default LoginRouter;