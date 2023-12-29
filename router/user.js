const express = require("express");
const userController = require("../controller/userController");
const routeUser = express.Router()

routeUser.post('/login',userController.login)
routeUser.post('/register', userController.register)

module.exports = routeUser