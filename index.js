import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import appRouter from './routes/Index.js';
import db from './config/Database.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use(appRouter)

app.listen(5000, () => console.log('Listening up and running...'));