const express = require("express");
const asistenController = require("../controller/asistenController");
const routeAsisten = express.Router()
const asistenMiddleware = require("../middleware/asistenMiddleware")

const userMiddleware = require('../middleware/userMiddleware')
routeAsisten.use(userMiddleware.authenticateUser)

routeAsisten.post('/', asistenMiddleware.validationInput, userMiddleware.authorizeROle('asisten', 'admin'), asistenController.create)
routeAsisten.get('/', userMiddleware.authorizeROle('admin'), asistenController.getAll)
routeAsisten.get('/:parameter/:value', userMiddleware.authorizeROle('admin'), asistenController.getAstByParam)
routeAsisten.put('/:id', asistenMiddleware.validationInput, userMiddleware.authorizeROle('asisten', 'admin'), asistenController.update)
routeAsisten.delete('/:parameter/:value', userMiddleware.authorizeROle('admin'), asistenController.deleteByParam)

module.exports = routeAsisten