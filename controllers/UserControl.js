import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json({
            msg: 'Success get all users',
            status: 200,
            data: allUsers,
            method: req.method
        })
    } catch(err) {
        console.log(err);
    }
}

export const getUserById = async(req, res) => {
    try {
        const getUser = await User.findByPk(req.params.userId);
        console.log(getUser)
    } catch(err) {
        res.status(400).json({msg: err.message});
    }
}

export const addUser = async(req, res) => {
    const {username, password} = req.body;
    try {
        const createdUser = await User.create({username: username, password: password});
        res.status(200).json({msg: "Successfully added user", status: 200, data: createdUser, method: req.method})
    } catch(err){
        res.status(402).json({msg: err.message});
    }
}

export const updateUser = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);

        if(!user){
            return res.status(404).json({ msg: "User not found" });
        }

        await User.update(req.body, {where: {id: req.params.userId}})
        const updatedUser = await User.findByPk(req.params.userId)
        res.status(200).json({
            msg: 'User updated successfully',
            status: '200',
            data: updatedUser,
            method: req.method
        })
    } catch(err){
        res.status(500).json({ msg: err.message });
    }
}

export const deleteUser = async(req, res) => {
    try{
        const deletedUser = await User.destroy({where: {id: req.params.userId}})
        if(deletedUser){
            res.status(200).json({
                status: 200,
                msg: "success delete user", 
                data: deletedUser, 
                method: req.method, 
            })
        } else {
            res.status(404).json({ msg: "User not found", status: 404 });
        }
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}