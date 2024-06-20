import Announcement from "../models/AnnounceModel.js";

export const getAllAnnouncements = async(req, res) => {
    try {
        const findAllData = await Announcement.findAll();
        res.status(200).json({
            status: '200',
            data_length: findAllData.length,
            data: findAllData,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const getAnnouncementByPk = async(req, res) => {
    try {
        const findOneData = await Announcement.findByPk(req.params.announcementId);
        res.status(200).json({
            status: '200',
            data: findOneData,
            method: req.method
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const uploadAnnouncement = async (req, res) => {
    const { title, content } = req.body;

    try {
        const createdData = await Announcement.create({title, content});
        res.status(200).json({
            msg: 'Successfully created announcement',
            data: createdData
        })
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}

export const deleteAllAnnouncements = async(req, res) => {
    try {
        await Announcement.destroy({where: {}, truncate: true});
        res.status(200).json({msg: 'All announcement deleted successfully'})
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}