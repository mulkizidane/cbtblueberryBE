import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ExamType = db.define('ExamType', {
    exam_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exam_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exam_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default ExamType;

(async() => {
    await ExamType.sync()
})()