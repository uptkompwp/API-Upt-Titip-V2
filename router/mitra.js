const express = require("express");
const mitraController = require("../controller/mitraController");
const mitraMiddleware = require('../middleware/mitraMiddleware')
const routeMitra = express.Router()

const userMiddleware = require('../middleware/userMiddleware')
routeMitra.use(userMiddleware.authenticateUser)

routeMitra.post('/', mitraMiddleware.validationInput, userMiddleware.authorizeROle('mitra'), mitraController.create)
routeMitra.get('/', userMiddleware.authorizeROle('asisten', 'admin'), mitraController.getAll)
routeMitra.get('/:parameter/:value', userMiddleware.authorizeROle('asisten', 'admin'), mitraController.getMitraByParam)
routeMitra.put('/:id', mitraMiddleware.validationInput, userMiddleware.authorizeROle('mitra'), mitraController.update)
routeMitra.delete('/:parameter/:value', userMiddleware.authorizeROle('admin'), mitraController.deleteByParam)

module.exports = routeMitra