const express = require('express');
const BadRequestErr = require('../errors/bad-request')
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const jwt_secret_token = "secret token from .envfile";

async function loginWitAuth(req, res) {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        throw new BadRequestErr('Please provide email and password')
    }

    const token = jwt.sign({ email }, jwt_secret_token, { expiresIn: "1d" })
    res.status(200).json({ message: 'user loggedin', token })

}


const dashboard = async (req, res) => {

    const authorizations = req.headers.authorization;
    console.log(authorizations);

    if (!authorizations || !authorizations.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided');
    }

    const token = authorizations.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwt_secret_token);
        console.log(decoded);
        const { email } = decoded;
        console.log(email);
        req.user = { email }; // Assuming you only need the email in req.user
        console.log(decoded);

        const luckyNumber = Math.floor(Math.random() * 100);

        res.status(200).json({
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
        });
    } catch (err) {
        throw new CustomAPIError('Not authorized to access this route');
    }
}


module.exports = {
    dashboard,
    loginWitAuth
};