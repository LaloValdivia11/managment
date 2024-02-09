const express = require('express');
const bcrypt = require('bcrypt');

const jwt     = require('jsonwebtoken');
const dotenv  = require('dotenv').config();
const usermodel    = require('../models/User');

const secret = process.env.SECRET;

const app = express.Router();

const errorLogin = 'Usuario y/o contraseña incorrecta';
const logSuccess = 'Usuario autenticado correctamente';

const signToken = id => {
    return jwt.sign({ id }, secret, {
        expiresIn: 60 * 60 * 24
    });
};

app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await usermodel.findOne({ where: { Email } });
        
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password.' });
        }

        const match = bcrypt.compareSync(Password, user.Password);
        console.log(match);
        if (!match) {
            return res.status(401).send({ message: 'Invalid email or password.' });
        }

        const token = signToken(user.Id);
        return res.status(200).send({
            message: 'Login successful',
            token,
            user: Email,
            status: 200
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});



module.exports = app