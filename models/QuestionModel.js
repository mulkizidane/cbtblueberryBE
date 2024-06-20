import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Exam from "./ExamModel.js";

const Questions =  db.define('Questions', {
    no_question: DataTypes.INTEGER,
    question_type: DataTypes.STRING,
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correct_answer: DataTypes.STRING,
    examId: {
        type: DataTypes.INTEGER,
        references: {
            model: Exam,
            key: 'exam_code'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    image: DataTypes.BLOB('long')
}, {
    timestamps: false
})

Questions.belongsTo(Exam, {foreignKey: 'examId'});
Exam.hasMany(Questions, {foreignKey: 'examId'});

export default Questions;

(async() => {
    await Questions.sync();
})()