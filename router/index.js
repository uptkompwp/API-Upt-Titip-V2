const express = require("express");
const exampleController = require("../controller/exampleController");
const routeRole = require("./role");
const route = express.Router()

route.get('/',exampleController.index)
route.use('/role', routeRole)

module.exports = route