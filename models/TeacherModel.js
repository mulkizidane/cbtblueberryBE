import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import { hashPassword } from "../middleware/Middleware.js";
import { validateNIP, validateName, validatePassword, validateUsername } from "../validation/validator.js";

const Teachers = db.define('Teachers', {
    nip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: validateNIP
    },
    teacher_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validateName
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validateUsername

    },
    password: {
        type: DataTypes.STRING,
        password: false,
        allowNull: false,
        validate: validatePassword
    }
}, {
    freezeTableName: true,
    hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
    }
})

export default Teachers;

(async()=> {
    await Teachers.sync()
})()