import { DataTypes } from 'sequelize';
import db from '../config/Database.js'
import { validateName, validatePassword, validateUsername } from '../validation/validator.js';
import { hashPassword } from '../middleware/Middleware.js';

const Administrator = db.define('Administrator', {
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validateName
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
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

export default Administrator;

(async () => {
    await Administrator.sync()
})();