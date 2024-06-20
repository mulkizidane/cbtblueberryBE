import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Subject = db.define('Subjects', {
    subject_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

export default Subject;

(async () => {
    await Subject.sync()
})()