const menuMiddleware = {}

menuMiddleware.validationInput = (req, res, next) => {
    const { nama_menu, tipe_menu, harga, stok } = req.body
    const tipeMenu = req.body.tipe_menu.toLowerCase()
    //validasi field tidak boleh kosong
    if (!nama_menu || !tipe_menu || !harga || !stok) {
        return res.status(400).json({
            message: "Field tidak boleh kosong"
        })
    }
    
    if (tipeMenu !== "food" && tipeMenu !== "drink" && tipeMenu !== "snack") {
        return res.status(400).json({
            message: "Input tipe menu hanya dengan 'food', 'drink', ataupun 'pr' !"
        })
    }

    next()
}

module.exports = menuMiddleware