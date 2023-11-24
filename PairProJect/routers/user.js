const express = require("express");
const ControllerUser = require("../controllers/controllerUser");
const user = express.Router();

user.get('/users', ControllerUser.showAllRooms) // tampilan room  DONE
user.get('/users/book/:id', ControllerUser.bookRoom) // booking roomDONE
user.get('/users/register', ControllerUser.registUser) // add
user.post('/users/register/add', ControllerUser.registUserProcess) // post add 
user.get('/users/login', ControllerUser.loginUser)
user.post('/users/login/add', ControllerUser.loginUserProcess)
user.get('/users/profile', ControllerUser.renderProfile)
module.exports=user