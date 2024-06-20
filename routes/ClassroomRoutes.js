import express from 'express';
import { checkAdminRole } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import { deleteClassroom, getAllClassroom, getClassroomByPk, importClassroom, updateClassroom, uploadClassroom } from '../controllers/ClassroomControl.js';

const ClassroomRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

ClassroomRouter.get('/classrooms', getAllClassroom)
ClassroomRouter.get('/classrooms/:classId', checkAdminRole, getClassroomByPk)
ClassroomRouter.post('/:userId/classrooms', checkAdminRole, uploadClassroom)
ClassroomRouter.post('/:userId/classrooms/import', checkAdminRole, upload.single('file'), importClassroom)
ClassroomRouter.patch('/:userId/classrooms/:classId', checkAdminRole, updateClassroom)
ClassroomRouter.delete('/:userId/classrooms/:classId', checkAdminRole, deleteClassroom)

export default ClassroomRouter;