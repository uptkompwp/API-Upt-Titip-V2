const mitraMiddleware = {}


mitraMiddleware.validationInput = (req, res, next) => {
    const { nama_mitra, alamat, no_hp } = req.body
    
    //validasi field tidak boleh kosong
    if (!nama_mitra || !alamat || !no_hp) {
        return res.status(400).json({
            message: "Field tidak boleh kosong"
        })
    }
    
    next()
}

module.exports = mitraMiddleware