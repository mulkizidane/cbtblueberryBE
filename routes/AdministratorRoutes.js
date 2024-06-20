import express from 'express';
import { addAdministratorData, deleteAdministrator, getAdministratorByPk, getAllAdministrator, importAdministratorFile, updateAdministrator } from '../controllers/AdministratorControl.js';
import { checkAdminRole, verifyToken } from '../middleware/Middleware.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
const AdminRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

AdminRouter.get('/administrators', getAllAdministrator)
AdminRouter.get('/administrator',verifyToken, getAdministratorByPk)
AdminRouter.post('/:userId/administrators/import', checkAdminRole, upload.single('file'), importAdministratorFile)
AdminRouter.post('/:userId/administrator', checkAdminRole, addAdministratorData)
AdminRouter.patch('/:userId/administrator/:adminId', checkAdminRole, updateAdministrator)
AdminRouter.delete('/:userId/administrator/:adminId', checkAdminRole, deleteAdministrator)

export default AdminRouter;