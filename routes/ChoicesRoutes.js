import express from 'express';
import Choices from '../models/ChoiceModel.js';
const ChoicesRouter = express.Router();

ChoicesRouter.get('/choices/:choiceId', async(req, res) => {
    const choiceId = req.params.choiceId;
    try {
        const selectedChoices = await Choices.findAll({where: {id: choiceId}})
        if(selectedChoices.length === 0){
            return res.status(404).json({msg: 'No choices found'})
        }
        res.status(200).json({
            status: "200",
            msg: 'Successfully found id : '+choiceId,
            data: selectedChoices,
            method: req.method
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }
})

ChoicesRouter.patch('/choices/:choiceId', async(req, res) => {
    const choiceId = req.params.choiceId;
    try {
        const selectedChoices = await Choices.findAll({where: {id: choiceId}})
        if(selectedChoices.length === 0){
            return res.status(404).json({msg: 'No choices found'})
        }
        await Choices.update(req.body)
        res.status(200).json({
            status: "200",
            msg: 'Successfully updated id : '+choiceId,
            method: req.method
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }
})

ChoicesRouter.delete('/choices/:choiceId', async(req, res) => {
    const choiceId = req.params.choiceId;
    try {
        const selectedChoices = await Choices.findAll({where: {id: choiceId}})
        if(selectedChoices.length === 0){
            return res.status(404).json({msg: 'No choices found'})
        }
        await Choices.destroy({where: {id: choiceId}})
        return res.status(200).json({
            status: "200",
            msg: 'Successfully deleted id : '+choiceId,
            method: req.method
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const firstError = error.errors[0].message;
            res.status(400).json({msg: firstError});
        } else {
            console.log(error);
            res.status(500).json({msg: error.message});
        }
    }
})

export default ChoicesRouter;