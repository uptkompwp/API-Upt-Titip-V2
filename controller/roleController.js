const roleController = {}
const { Role } = require('../models')

/*
    this is auto generate example, you can continue 

*/
roleController.index = async (req, res) => {
    res.json({
        message: "Hello roleController"
    })
}

roleController.create = async (req, res) => {

    const { nama_role } = req.body
    try {

        const createData = await Role.create({
            nama_role
        })

        return res.status(201).json({
            message: 'Data baru berhasil tersimpan !',
            data: createData
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

roleController.getAll = async (req, res) => {

    try {

        const getData = await Role.findAll()

        return res.status(200).json({
            message: getData
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

roleController.update = async (req, res) => {

    const { id } = req.params
    const { nama_role } = req.body

    try {

        const getData = await Role.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang akan diupdate tidak ditemukan'
            })
        }

        const updateData = await Role.update({
            nama_role
        }, {
            where: {
                id: id
            }
        });

        return res.status(201).json({
            message: 'Data berhasil terupdate'
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

roleController.delete = async (req, res) => {

    const { id } = req.params

    try {

        const getData = await Role.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang akan dihapus cari tidak ditemukan'
            })
        }

        const deleteData = await Role.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

module.exports = roleController

