import express from 'express';
import { deleteAllAnnouncements, getAllAnnouncements, getAnnouncementByPk, uploadAnnouncement } from '../controllers/AnnounceControl.js';
import { checkAdminRole } from '../middleware/Middleware.js';
import Announcement from '../models/AnnounceModel.js';
const AnnounceRouter = express.Router();

AnnounceRouter.get('/announcements', getAllAnnouncements)
AnnounceRouter.get('/announcements/:announcementId', getAnnouncementByPk)
AnnounceRouter.post('/:userId/announcement/upload', checkAdminRole, uploadAnnouncement)
AnnounceRouter.delete('/:userId/announcements', checkAdminRole, deleteAllAnnouncements)
AnnounceRouter.delete('/:userId/announcements/:announcementId', checkAdminRole, async(req, res) => {
    const announceId = req.params.announcementId
    try {
        const deletedData = await Announcement.destroy({where: {id: announceId}})
        res.status(200).json({
            status: '200',
            msg: 'Announcement deleted successfully',
            data: deletedData,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})


export default AnnounceRouter;