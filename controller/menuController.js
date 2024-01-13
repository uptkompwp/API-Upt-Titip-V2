const menuController = {}
const { Menu, Mitra } = require('../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        return decoded.mitraData || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

menuController.create = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const { nama_menu, tipe_menu, harga, stok } = req.body

    const idMitra = getToken(token)
    try {
        const createData = await Menu.create({
            nama_menu,
            tipe_menu,
            harga,
            stok,
            mitra: idMitra
        })

        return res.status(200).json({
            message: "Data baru berhasil ditambahkan !",
            data: createData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

menuController.getMenusMitra = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idMitra = getToken(token)

    try {

        const getMenusMitra = await Menu.findAll({
            where: {
                mitra: idMitra
            }
        })

        if (!getMenusMitra) {
            return res.status(404).json({
                message: "Menu tidak tersedia !"
            })
        }

        return res.status(200).json({
            message: "Data berhasil ditampilkan !",
            data: getMenusMitra
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

menuController.getByMitra = async (req, res) => {

    try {
        const getMitraMenu = await Mitra.findAll({

            include: [{
                model: Menu,
                as: "menuData"
            }]
        })

        return res.status(200).json({
            message: "Data berhasil ditampilkan !",
            data: getMitraMenu
        })
    } catch (error) {


        return res.status(500).json({
            message: error
        })
    }
}

menuController.getMenuByParam = async (req, res) => {

    const { parameter, value } = req.params

    try {
        let whereClause = {}
        whereClause[parameter] = value

        const getMenuByParam = await Menu.findAll({
            where: whereClause
        })

        if (getMenuByParam.length === 0) {
            return res.status(404).json({
                message: `Data dengan ${parameter} '${value}' tidak ditemukan`
            });
        }

        return res.status(200).json({
            message: `Data berhasil ditampilkan berdasarkan ${parameter}`,
            data: getMenuByParam
        });
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

menuController.update = async (req, res) => {
    
    const { id } = req.params
    const { nama_menu, tipe_menu, harga, stok } = req.body

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');

    const idMitra = getToken(token)

    try {

        const getData = await Menu.findAll({
            where: {
                mitra: idMitra
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang akan diupdate tidak ditemukan'
            })
        }

        const menuById = getData.find(data => data.id == id);
        if (!menuById) {
            return res.status(404).json({
                message: 'Menu dengan mitra tersebut tidak ditemukan'
            });
        }

        const updateData = await Menu.update({
            nama_menu,
            tipe_menu,
            harga,
            stok,
            mitra: idMitra
        }, {
            where: {
                id: id
            }
        })

        return res.status(201).json({
            message: 'Data berhasil terupdate'
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

menuController.delete = async (req, res) => {
    
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');

    const idMitra = getToken(token)

    try {
        const menuId = req.params.id

        const getMenu = await Menu.findAll({
            where: {
                mitra: idMitra
            }
        });

        if (!getMenu) {
            return res.status(404).json({
                message: 'Data tidak tersedia'
            });
        }

        const menuById = getMenu.find(data => data.id == menuId);

        if (!menuById) {
            return res.status(404).json({
                message: 'Menu dengan ID tersebut tidak ditemukan'
            });
        }

        const deleteData = await Menu.destroy({
            where: {
                id: menuId
            }
        })

        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
}


module.exports = menuController

