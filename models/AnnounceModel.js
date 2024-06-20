import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Announcement = db.define('Announcement', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
})

export default Announcement;

(async() => {
    await Announcement.sync();
})()