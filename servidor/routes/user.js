const express = require('express');
const app = express.Router();
const { registroUser } = require('../controllers/registroUsersController');

app.post('/registrar/usuario', async (req, res) =>{
    try{
        const {Name, Age, LastName, Address, Email, Password} = req.body;
        const registrarUser = registroUser(Name, Age, LastName, Address, Email, Password);
        return res.status(200).send({
            message : 'Se ha registrado el usuario correctamente',
            data : registrarUser
        })
    }
    catch(error){
        console.log('Internal Server Error :', error);
    }
})

module.exports = app