import express from 'express';
import { deleteSubject, getAllSubjects, getSubjectByPk, importSubjectFile, postSubject, updateSubject } from '../controllers/SubjectControl.js';
import { checkAdminRole } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SubjectRouter = express.Router();
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

SubjectRouter.post('/:userId/subjects/import', checkAdminRole, upload.single('file'), importSubjectFile )
SubjectRouter.get('/subjects', getAllSubjects)
SubjectRouter.get('/subjects/:subjectId', getSubjectByPk)
SubjectRouter.post('/:userId/subjects', checkAdminRole, postSubject)
SubjectRouter.patch('/:userId/subjects/:subjectId',checkAdminRole, updateSubject)
SubjectRouter.delete('/subjects/:subjectId', deleteSubject)

export default SubjectRouter;