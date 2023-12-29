const express = require("express");
const roleController = require("../controller/roleController");
const routeRole = express.Router()

const userMiddleware = require('../middleware/userMiddleware')
routeRole.use(userMiddleware.authenticateUser)

routeRole.post('/', userMiddleware.authorizeROle('admin'), roleController.create)
routeRole.get('/', userMiddleware.authorizeROle('admin'), roleController.getAll)
routeRole.put('/:id', userMiddleware.authorizeROle('admin'), roleController.update)
routeRole.delete('/:id', userMiddleware.authorizeROle('admin'), roleController.delete)

module.exports = routeRole