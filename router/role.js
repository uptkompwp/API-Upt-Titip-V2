const express = require("express");
const roleController = require("../controller/roleController");
const routeRole = express.Router()

routeRole.post('/',roleController.create)
routeRole.get('/',roleController.getAll)
routeRole.put('/:id',roleController.update)
routeRole.delete('/:id',roleController.delete)

module.exports = routeRole