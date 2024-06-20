import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Classroom = db.define('Classroom', {
    class_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class_level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Classroom;

(async() => {
    await Classroom.sync()
})()