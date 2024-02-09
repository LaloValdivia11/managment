const express = require('express');
const app = express.Router();
const { obtenerOportunidades, descontarDineroInversion ,buscarOportunidad, obtenerInversionesUsuario, retirarInversion, buscarInversionesUsuario} = require('../controllers/inversionesController.js');
const { notificarInversion } = require('../controllers/notificacionesController');
const { deductMoney, informacionUsuario } = require('../controllers/registroUsersController');
const passport = require('passport');
const config = require('../config/config.json');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');


app.get('/obtener/inversiones', async (req, res) => {
    try {
        const obtenerOportunidad = await obtenerOportunidades();

        res.status(200).send({
            messsage: "Se ha obtenido la informacion correctamente",
            data: obtenerOportunidad
        })
    }
    catch (error) {
        console.log('Error Internal Server :', error)
    }
})

app.post('/realizar/inversion', async (req, res) => {
    try {
        const { id, amount, fkUser } = req.body
      
        const realizarInversion = await buscarOportunidad(id);
        const dataUser = await informacionUsuario(fkUser);
        const name = dataUser.Name
        const totalAmountUser = dataUser.Amount;
        const totalAmountInversion = realizarInversion.TotalAmount;

        console.log(totalAmountUser);
        if (amount > totalAmountUser ||amount < 0) {
            res.status(201).send({
                "message": "Monto de inversion no valido"
            })
        }
        else {
            let updateMoneyUser = totalAmountUser - amount;
            const descontarAmount = await deductMoney(fkUser, updateMoneyUser);
            let updateMoneyInversion = totalAmountInversion - amount;
            const descontarInversion = await descontarDineroInversion(id, updateMoneyInversion, fkUser);
            var notificacion = await notificarInversion(fkUser, name, amount);
        }

        res.status(200).send({
            message: "Se ha hecho la inversion correctamen",
            data :{
                'dataNotificacion' : notificacion
            }
         })
    }
    catch (error) {
        console.log("Error Internal Server :", error);
    }

})

app.get('/retirar/inversion/:id/:inversion', async (req, res) => {
    try {
        const userId = req.params.id;
        const inversion = req.params.inversion;

        const inversionesUsuario = await obtenerInversionesUsuario(userId);

        if (inversionesUsuario.length > 0) {

            //const retirar = retirarInversion();
        }
        else {
            res.status(200).send({
                message: 'No tienes inversion'
            })
        }
    }
    catch (error) {
        console.log('Error Internal Server', error);
    }
})

app.get('/obtener/inversiones/usuario/:id', async (req, res) =>{
    try{
        const userId = req.params.id;
        const buscarInversiones = await buscarInversionesUsuario(userId);

        res.status(200).send({
            data : buscarInversiones
        })
    
    }
    catch(error){
        console.log('Error Internal Server', error);
    }
})


module.exports = app