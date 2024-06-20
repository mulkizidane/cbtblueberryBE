import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import { validateNIS, validateName, validatePassword, validateUsername } from "../validation/validator.js";
import { hashPassword } from "../middleware/Middleware.js";

const Students = db.define('Students', {
    nis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: validateNIS
    },
    student_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validateName
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Class cannot be empty"
            }
        }
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Level cannot be empty"
            }
        }
    },
    majority: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Majority cannot be empty"
            }
        }
    },
    session: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Session cannot be empty"
            }
        }
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Room cannot be empty"
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validateUsername
    },
    password: {
        type: DataTypes.STRING,
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

export default Students;

(async() => {
    await Students.sync()
})()