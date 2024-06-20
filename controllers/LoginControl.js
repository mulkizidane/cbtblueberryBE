import Students from "../models/StudentModel";

export const getAccount = async(req,res) => {
    try {
        const student = await Students.findByPk(req.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!student) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }

        return res.status(200).json(student);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}