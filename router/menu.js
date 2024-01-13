const express = require("express");
const menuController = require("../controller/menuController");
const menuMiddleware = require('../middleware/menuMiddleware')
const routeMenu = express.Router()

const userMiddleware = require('../middleware/userMiddleware')
routeMenu.use(userMiddleware.authenticateUser)

routeMenu.post('/', menuMiddleware.validationInput, userMiddleware.authorizeROle('mitra'), menuController.create)
routeMenu.get('/', userMiddleware.authorizeROle('mitra'), menuController.getMenusMitra)
routeMenu.get('/menusMitra', userMiddleware.authorizeROle('asisten', 'admin'), menuController.getByMitra)
routeMenu.get('/:parameter/:value', userMiddleware.authorizeROle('asisten', 'admin'), menuController.getMenuByParam)
routeMenu.put('/:id', menuMiddleware.validationInput, userMiddleware.authorizeROle('mitra'), menuController.update)
routeMenu.delete('/:id', userMiddleware.authorizeROle('mitra'), menuController.delete)

module.exports = routeMenu