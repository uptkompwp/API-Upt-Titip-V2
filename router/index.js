const express = require("express");
const exampleController = require("../controller/exampleController");
const routeRole = require("./role");
const routeAsisten = require("./asisten");
const routeUser = require("./user");
const routeMitra = require("./mitra");
const routeMenu = require("./menu");
const route = express.Router()

route.get('/', exampleController.index)
route.use('/role', routeRole)
route.use('/auth', routeUser)
route.use('/asisten', routeAsisten)
route.use('/mitra', routeMitra)
route.use('/menu', routeMenu)


module.exports = route