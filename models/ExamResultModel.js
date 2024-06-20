import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Students from "./StudentModel.js";

const ExamResult = db.define('ExamResult', {
    subject: DataTypes.STRING,
    exam_code: DataTypes.INTEGER,
    exam_date: DataTypes.DATE,
    exam_duration: DataTypes.INTEGER,
    total_grade: DataTypes.INTEGER,
    passing_score: DataTypes.INTEGER,
    information: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Students,
            key: 'nis'
    },
        primaryKey: true,
        onDelete: 'CASCADE'
    }
}, {
    freezeTableName: true
})

ExamResult.belongsTo(Students, {foreignKey: 'userId'});
Students.hasMany(ExamResult, {foreignKey: 'userId'});

export default ExamResult;

(async() => {
    await ExamResult.sync();
})()