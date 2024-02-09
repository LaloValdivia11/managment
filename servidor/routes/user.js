const express = require('express');
const app = express.Router();
const { registroUser } = require('../controllers/registroUsersController');

app.post('/registrar/usuario', async (req, res) =>{
    try{
        const {name, age, lastName, address, email, password} = req.body;
        const registrarUser = registroUser(name, age, lastName, address, email, password);
        return res.status(200).send({
            message : 'Se ha registrado el usuario correctamente',
            registrarUser
        })
    }
    catch(error){
        console.log('Internal Server Error :', error);
    }
})

module.exports = app