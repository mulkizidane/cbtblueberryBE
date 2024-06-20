import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import ExamResult from "./ExamResultModel.js";

const QuestionRes = db.define('QuestionResult', {
    question: DataTypes.STRING,
    result: DataTypes.BOOLEAN,
    examResId: {
        type: DataTypes.INTEGER,
        references: {
            model: ExamResult,
            key: 'userId'
        },
        onDelete: 'CASCADE'
    }
}, {
    freezeTableName: true
})

QuestionRes.belongsTo(ExamResult, {foreignKey: 'examResId'})
ExamResult.hasMany(QuestionRes, {foreignKey: 'examResId'})

export default QuestionRes;

(async() => {
    await QuestionRes.sync()
})()