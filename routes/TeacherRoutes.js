import express from 'express';
import { addTeacherData, deleteTeacher, getAllTeachers, getTeacherByPk, importTeacherFile, updateTeacher } from '../controllers/TeacherControl.js';
import { checkAdminRole, verifyToken } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
const TeacherRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

TeacherRouter.get('/teachers', getAllTeachers)
TeacherRouter.get('/teacher',verifyToken , getTeacherByPk)
TeacherRouter.post ('/:userId/teachers/',checkAdminRole, addTeacherData)
TeacherRouter.post ('/:userId/teachers/import',checkAdminRole, upload.single('file'), importTeacherFile)
TeacherRouter.patch('/teachers/:teacherId', updateTeacher)
TeacherRouter.delete('/:userId/teachers/:teacherId',checkAdminRole, deleteTeacher)

export default TeacherRouter;