const { loginWitAuth, dashboard } = require('../controllers/loginWithAuthController');
const express = require('express');
const loginRouter = express.Router();

loginRouter.post('/login', loginWitAuth);

loginRouter.get('/dashboard', dashboard);

module.exports = loginRouter;
