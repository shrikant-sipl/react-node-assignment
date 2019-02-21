var express = require('express');
var Router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController')


//Basic Home Page of Server root
Router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//Route for Login Auth calling userController for Login
Router.post('/auth/login', AuthController.loginUser);

//Route for getting allusers
Router.post('/allUsers', UserController.getAllUser);


//Route for getting allusers
Router.get('/user', UserController.getUser);

//Route for update user
Router.post('/createUser', UserController.createUser);

//Route for update user
Router.put('/updateUser', UserController.updateUser);

//Route for update user
Router.post('/upload', UserController.uploadImage);

//Route for delete user
// Router.put('/deleteUsers', UserController.deleteUser);
module.exports = Router;
