import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
})

export default User;

(async () => {
    await User.sync()
})()