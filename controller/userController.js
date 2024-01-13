const userController = {}
const { Op } = require('sequelize')
const { User, Role, Asisten, Mitra } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

userController.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const findUser = await User.findOne({
            where: {
                username: { [Op.eq]: username }
            },
            include: [{
                model: Role, as: "Role"
            }]
        })

        if (!findUser) {
            return res.status(401).json({
                message: "Username tidak ditemukan !"
            })
        }

        const findAst = await Asisten.findOne({
            where: {
                user: findUser.id
            }
        })

        const findMitra = await Mitra.findOne({
            where: {
                user: findUser.id
            }
        })

        let asistenData
        if (findAst) {
            asistenData = findUser.id
        }

        let mitraData
        if (findMitra) {
            mitraData = findMitra.id
        }

        const comparePassword = await bcrypt.compare(password, findUser.password)

        if (comparePassword) {

            const payloadToken = {
                id: findUser.id,
                username: findUser.username,
                role: findUser.Role.nama_role
            }

            if (asistenData !== null) {
                payloadToken.asistenData = asistenData
            }

            if (mitraData !== null) {
                payloadToken.mitraData = mitraData
            }

            const token = jwt.sign(payloadToken, process.env.PRIVATE_KEY, {
                algorithm: 'HS256',
                expiresIn: '1h'
            })

            return res.status(200).json({
                message: "Login berhasil !",
                token: token
            })
        } else {
            return res.status(401).json({
                message: "Password salah !"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Gagal login !",
            error: error.message
        })
    }
}

userController.register = async (req, res) => {
    const { username, password, role } = req.body
    const saltRounds = 10
    const generateSalt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(password, generateSalt)

    const getIdRole = await Role.findOne({
        where: {
            id: role
        }
    })

    const existingUsername = await User.findOne({
        where: {
            username: username
        }
    })

    //validasi id_role yang diinputkan
    if (!getIdRole) {
        return res.status(404).json({
            message: "Id role tidak ditemukan ! "
        })
    }

    //validasi username yang sama
    if (existingUsername) {
        return res.status(400).json({
            message: "Username sudah pernah digunakan ! "
        })
    }

    const createUser = await User.create({
        username: username,
        password: password,
        password: hashPassword,
        passwordSalt: generateSalt,
        role: role
    })

    return res.status(201).json({
        message: 'User berhasil dibuat'
    })
}

module.exports = userController

