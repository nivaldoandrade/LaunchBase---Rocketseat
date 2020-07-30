const express = require('express');
const routes = express.Router();

const SessionController = require('../app/controllers/SessionController');
const UserController = require('../app/controllers/UserController');
const OrderController = require('../app/controllers/OrderController');

const userValidator = require('../app/validators/users');
const sessionValidator = require('../app/validators/session');
const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session');


// // LOGIN / LOGOUT
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm);
routes.post('/login', sessionValidator.login, SessionController.login);
routes.post('/logout', SessionController.logout);

// // reset password / forgot

routes.get('/reset-password', SessionController.resetForm);
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/reset-password', sessionValidator.reset, SessionController.reset);
routes.post('/forgot-password', sessionValidator.forgot, SessionController.forgot);

// // user register

routes.get('/register', UserController.registerForm);
routes.post('/register', userValidator.post, UserController.post);
routes.get('/', onlyUsers, userValidator.show, UserController.show);
routes.put('/', userValidator.update, UserController.update);
routes.delete('/', UserController.delete);
routes.get('/ads', UserController.ads);

routes.post('/orders', onlyUsers, OrderController.post)


module.exports = routes;