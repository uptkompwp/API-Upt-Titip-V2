const asistenController = {}
const { Asisten, User } = require('../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { where } = require('sequelize')
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


asistenController.create = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const { nama, alamat, no_hp, jk } = req.body

    const idUser = getToken(token)
    try {

        const existingUser = await Asisten.findOne({
            where: {
                user: idUser
            }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Asisten sudah terdaftar !"
            })
        }

        const createData = await Asisten.create({
            nama,
            alamat,
            no_hp,
            jk,
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

asistenController.getAll = async (req, res) => {

    try {
        const getAst = await Asisten.findAll({

            include: [{
                model: User,
                as: "userData"
            }]
        })

        return res.status(200).json({
            message: "Data berhasil ditampilkan !",
            data: getAst
        })
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

asistenController.getAstByParam = async (req, res) => {
    const { parameter, value } = req.params

    try {
        let whereClause = {}
        whereClause[parameter] = value

        const getAstByParam = await Asisten.findAll({
            where: whereClause
        })

        if (getAstByParam.length === 0) {
            return res.status(404).json({
                message: `Data dengan ${parameter} '${value}' tidak ditemukan`
            });
        }

        return res.status(200).json({
            message: `Data berhasil ditampilkan berdasarkan ${parameter}`,
            data: getAstByParam
        });
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

asistenController.update = async (req, res) => {
    const { id } = req.params
    const { nama, alamat, no_hp, jk } = req.body

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');

    const idUser = getToken(token)

    try {

        const getData = await Asisten.findAll({
            where: {
                user: idUser
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang akan diupdate tidak ditemukan'
            })
        }

        const astById = getData.find(data => data.id == id);
        if (!astById) {
            return res.status(404).json({
                message: 'Asisten dengan user tersebut tidak ditemukan'
            });
        }

        const updateData = await Asisten.update({
            nama,
            alamat,
            no_hp,
            jk,
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

asistenController.deleteByParam = async (req, res) => {
    const { parameter, value } = req.params

    try {
        let whereClause = {}
        whereClause[parameter] = value

        const getAstByParam = await Asisten.findAll({
            where: whereClause
        })

        if (getAstByParam.length === 0) {
            return res.status(404).json({
                message: `Data dengan ${parameter} '${value}' tidak ditemukan`
            });
        }

        const deleteData = await Asisten.destroy({
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

module.exports = asistenController

