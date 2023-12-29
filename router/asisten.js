const express = require("express");
const asistenController = require("../controller/asistenController");
const routeAsisten = express.Router()
const asistenMiddleware = require("../middleware/asistenMiddleware")

const userMiddleware = require('../middleware/userMiddleware')
routeAsisten.use(userMiddleware.authenticateUser)

routeAsisten.post('/', asistenMiddleware.validationInput, userMiddleware.authorizeROle('asisten'), asistenController.create)
routeAsisten.get('/', asistenController.getAll)
routeAsisten.get('/:parameter/:value', asistenController.getAstByParam)
// routeAsisten.put('/:id',asistenController.update)
// routeAsisten.delete('/:id',asistenController.delete)

module.exports = routeAsisten