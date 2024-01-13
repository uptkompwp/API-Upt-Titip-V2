const mitraController = {}
const { Mitra} = require('../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        return decoded.id || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

mitraController.create = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const { nama_mitra, alamat, no_hp} = req.body

    const idUser = getToken(token)
    try {

        const existingUser = await Mitra.findOne({
            where: {
                user: idUser
            }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Mitra sudah terdaftar !"
            })
        }

        const createData = await Mitra.create({
            nama_mitra,
            alamat,
            no_hp,
            user: idUser
        })

        return res.status(200).json({
            message: "Data baru berhasil ditambahkan !",
            data: createData
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

mitraController.getAll = async (req, res) => {

    try {
        const getMitra = await Mitra.findAll(

            // include: [{
            //     model: User,
            //     as: "userData"
            // }]
        )

        return res.status(200).json({
            message: "Data berhasil ditampilkan !",
            data: getMitra
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

mitraController.getMitraByParam = async (req, res) => {
    const { parameter, value } = req.params

    try {
        let whereClause = {}
        whereClause[parameter] = value

        const getMitraByParam = await Mitra.findAll({
            where: whereClause
        })

        if (getMitraByParam.length === 0) {
            return res.status(404).json({
                message: `Data dengan ${parameter} '${value}' tidak ditemukan`
            });
        }

        return res.status(200).json({
            message: `Data berhasil ditampilkan berdasarkan ${parameter}`,
            data: getMitraByParam
        });
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

mitraController.update = async (req, res) => {
    const { id } = req.params
    const { nama_mitra, alamat, no_hp} = req.body

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');

    const idUser = getToken(token)

    try {

        const getData = await Mitra.findAll({
            where: {
                user: idUser
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang akan diupdate tidak ditemukan'
            })
        }

        const mitraById = getData.find(data => data.id == id);
        if (!mitraById) {
            return res.status(404).json({
                message: 'Mitra dengan user tersebut tidak ditemukan'
            });
        }

        const updateData = await Mitra.update({
            nama_mitra,
            alamat,
            no_hp,
            user: idUser
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

mitraController.deleteByParam = async (req, res) => {
    const { parameter, value } = req.params

    try {
        let whereClause = {}
        whereClause[parameter] = value

        const getMitraByParam = await Mitra.findAll({
            where: whereClause
        })

        if (getMitraByParam.length === 0) {
            return res.status(404).json({
                message: `Data dengan ${parameter} '${value}' tidak ditemukan`
            });
        }

        const deleteData = await Mitra.destroy({
            where: whereClause
        })

        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })
    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = mitraController

