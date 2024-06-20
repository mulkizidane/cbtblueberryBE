import express from 'express';
import { checkAdminRole } from '../middleware/Middleware.js';
import { deleteExamType, getAllExamType, getExamTypeByPk, importExamType, updateExamType, uploadExamType } from '../controllers/ExamTypeControl.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

const ExamTypeRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

ExamTypeRouter.get('/exam-type', getAllExamType)
ExamTypeRouter.get('/exam-type/:examTypeId', checkAdminRole, getExamTypeByPk)
ExamTypeRouter.post('/:userId/exam-type', checkAdminRole, uploadExamType)
ExamTypeRouter.post('/:userId/exam-type/import', checkAdminRole, upload.single('file'), importExamType)
ExamTypeRouter.patch('/:userId/exam-type/:examTypeId', checkAdminRole, updateExamType)
ExamTypeRouter.delete('/:userId/exam-type/:examTypeId/delete', checkAdminRole, deleteExamType)

export default ExamTypeRouter;