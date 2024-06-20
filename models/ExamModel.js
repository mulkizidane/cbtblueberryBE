import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import FinalExam from "./FinalExamModel.js";

const Exam = db.define('Exam', {
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
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Subject cannot be empty"
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
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Class cannot be empty"
            }
        }
    },
    start_exam: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Date cannot be empty"
            }
        }
    },
    end_exam: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Date cannot be empty"
            }
        }
    },
    total_multiple_choices: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    mc_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    mc_display_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    total_opt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    total_essay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    essay_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    essay_display_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },
    passing_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please fill in all this field"
            }
        }
    },

    exam_token: DataTypes.STRING,
    exam_type: DataTypes.STRING,
    exam_session: DataTypes.INTEGER,
    exam_duration: DataTypes.INTEGER,   
    violation: DataTypes.INTEGER,
    is_random_question: DataTypes.BOOLEAN,
    is_random_option: DataTypes.BOOLEAN,
    is_show_result: DataTypes.BOOLEAN,
    is_reset_login: DataTypes.BOOLEAN,
}, {
    freezeTableName: true
})

export default Exam;

(async() => {
    await Exam.sync()
})()