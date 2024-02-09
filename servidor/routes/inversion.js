const express = require('express');
const app = express.Router();
const { obtenerOportunidades, descontarDineroInversion ,buscarOportunidad, deleteInversionesUsuario, retirarInversion, buscarInversionesUsuario, inversionRealizada} = require('../controllers/inversionesController.js');
const { notificarInversion } = require('../controllers/notificacionesController');
const { deductMoney, informacionUsuario } = require('../controllers/registroUsersController');
const passport = require('passport');
const config = require('../config/config.json');
const { Sequelize } = require('sequelize');

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

        if (amount > totalAmountUser ||amount < 0) {
            res.status(201).send({
                "message": "Monto de inversion no valido"
            })
        }
        else {
            let updateMoneyUser = totalAmountUser - amount;
            var descontarAmount = await deductMoney(fkUser, updateMoneyUser);
            let updateMoneyInversion = totalAmountInversion - amount;
            var descontarInversion = await descontarDineroInversion(id, updateMoneyInversion);
            var agregarInversion = await inversionRealizada(name, amount, id); 
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

app.delete('/retirar/inversion/:id/:inversion', async (req, res) => {
    try {
        const userId = req.params.id;
        const inversion = req.params.inversion;

        const inversionesUsuario = await deleteInversionesUsuario(userId);
        
        res.status(200).send({
            message: 'Se ha eliminado correctamente'
        })
        
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