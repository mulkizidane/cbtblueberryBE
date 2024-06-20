import { DataTypes } from "sequelize";
import db from "../config/Database";

const Account = db.define('Account', {
    data: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

export default Account;

(async() => {
    await Account.sync()
})()