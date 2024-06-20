import express from 'express';
import userRouter from './UserRoutes.js';
import ExamRouter from './ExamRoutes.js';
import multer from 'multer';
import Questions from '../models/QuestionModel.js';
import AnnounceRouter from './AnnounceRoutes.js'
import SubjectRouter from './SubjectRoutes.js';
import ExamTypeRouter from './ExamTypeRoutes.js';
import AdminRouter from './AdministratorRoutes.js';
import StudentRouter from './StudentRoutes.js'
import TeacherRouter from './TeacherRoutes.js';
import LoginRouter from './Login.js';
import ClassroomRouter from './ClassroomRoutes.js';
import QuestionRouter from './QuestionRoutes.js';
import ChoicesRouter from './ChoicesRoutes.js';
import ExResultRouter from './ExamResultRoutes.js';
const appRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

appRouter.post('/upload/:questionId', upload.single('image'), async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const image = req.file.buffer;

        const question = await Questions.findByPk(questionId);
        if(!question){
            return res.status(404).send('Question not found')
        }

        question.image = image;
        await question.save();

        res.send('Image uploaded successfully') 
    } catch(err){
        res.status(500).json({msg: err.message})
    }
})

appRouter.get('/', function(req, res) {
    res.json({msg: 'Hello'})
})

appRouter.use(LoginRouter);
appRouter.use(userRouter);
appRouter.use(AdminRouter);
appRouter.use(StudentRouter);
appRouter.use(ExResultRouter);
appRouter.use(TeacherRouter);
appRouter.use(SubjectRouter)
appRouter.use(ExamTypeRouter)
appRouter.use(ClassroomRouter)
appRouter.use(AnnounceRouter)
appRouter.use(ExamRouter);
appRouter.use(QuestionRouter);
appRouter.use(ChoicesRouter)

export default appRouter;