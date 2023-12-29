const express = require("express");
const exampleController = require("../controller/exampleController");
const routeRole = require("./role");
const routeAsisten = require("./asisten");
const routeUser = require("./user");
const route = express.Router()

route.get('/',exampleController.index)
route.use('/role', routeRole)
route.use('/asisten', routeAsisten)
route.use('/auth', routeUser)

module.exports = route