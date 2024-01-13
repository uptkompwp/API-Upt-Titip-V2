const asistenMiddleware = {}


asistenMiddleware.validationInput = (req, res, next) => {
    const { nama, alamat, no_hp, jk } = req.body
    const jenisKelamin = req.body.jk.toLowerCase()

    //validasi field tidak boleh kosong
    if (!nama || !alamat || !no_hp || !jk) {
        return res.status(400).json({
            message: "Field tidak boleh kosong"
        })
    }

    //validasi value variable jk
    if (jenisKelamin !== "lk" && jenisKelamin !== "pr") {
        return res.status(400).json({
            message: "Input jenis kelamin hanya dengan 'lk' ataupun 'pr' !"
        })
    }

    next()
}

module.exports = asistenMiddleware