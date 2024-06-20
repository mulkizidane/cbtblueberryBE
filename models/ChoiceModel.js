import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Questions from "./QuestionModel.js";

const Choices = db.define('Choices', {
    option: {
        type: DataTypes.STRING, 
    },
    text: {
        type: DataTypes.STRING,
    },  
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Questions,
            key: 'id',       
        },
        onDelete: 'CASCADE'
    },
}, {
    freezeTableName: true,
    timestamps: false
})

Choices.belongsTo(Questions, {foreignKey: 'questionId'});
Questions.hasMany(Choices, {foreignKey: 'questionId'});

export default Choices;

(async () => {
    await Choices.sync()
})()
