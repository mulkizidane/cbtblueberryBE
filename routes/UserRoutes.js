import express from 'express';
import { addUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserControl.js';
const userRouter = express.Router();

userRouter.get('/users', getUsers)
userRouter.get('/users/:userId', getUserById)
userRouter.post('/users', addUser)
userRouter.delete('/users/:userId', deleteUser)
userRouter.patch('/users/:userId', updateUser)

export default userRouter;