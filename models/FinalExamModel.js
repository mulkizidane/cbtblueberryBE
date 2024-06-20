import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const FinalExam = db.define('FinalExam', {
    exam_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: {
                msg: "Exam code cannot be empty"
            }
        }
    },
    exam_token: DataTypes.STRING,
    exam_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Exam type cannot be empty"
            }
        }
    },
    exam_session: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Exam Session cannot be empty"
            }
        }
    },
    exam_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Exam Duration cannot be empty"
            }
        }
    },
    violation: {
        type: DataTypes.INTEGER,
    },
    is_random_question: DataTypes.BOOLEAN,
    is_random_option: DataTypes.BOOLEAN,
    is_show_result: DataTypes.BOOLEAN,
    is_reset_login: DataTypes.BOOLEAN,
}, {
    freezeTableName: true
})


export default FinalExam;