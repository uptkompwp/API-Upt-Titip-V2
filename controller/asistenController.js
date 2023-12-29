const asistenController = {}
const { Asisten, User } = require('../models')
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


asistenController.create = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const { nama, alamat, no_hp, jk} = req.body

    const idUser = getToken(token)
    try {
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

        if (!getAstByParam) {
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

module.exports = asistenController

