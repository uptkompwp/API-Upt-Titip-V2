const asistenController = {}
const { Asisten, User } = require('../models')
const asisten = require('../models/asisten')


asistenController.create = async (req, res) => {
    const { nama, alamat, no_hp, jk, user } = req.body

    try {
        const getUser = await User.findOne({
            where: {
                id: user
            }
        })

        if (!getUser) {
            return res.status(404).json({
                message: "Id user tidak ditemukan !"
            })
        }

        const createData = await Asisten.create({
            nama,
            alamat,
            no_hp,
            jk,
            user
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

// asistenController.getById = async (req, res) => {
//     const { id } = req.params

//     try {
//         const getAstById = await Asisten.findOne({
//             where: {
//                 id: id
//             }
//         })

//         return res.status(200).json({
//             message: "Data berhasil ditampilkan !",
//             data: getAstById
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: error
//         })
//     }
// }

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

