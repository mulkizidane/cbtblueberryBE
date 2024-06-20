export const Response = (req, res, data, status) => {
    return res.status(status).json({
        msg: "No data found",
        status: "200",
        data_length: data.length,
        data: data,
        method: req.method
    })
}