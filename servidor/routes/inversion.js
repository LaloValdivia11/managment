const express = require('express');
const app = express.Router();
const { obtenerOportunidades, descontarDineroInversion ,buscarOportunidad, deleteInversionesUsuario, retirarInversion, buscarInversionesUsuario, inversionRealizada, obtenerInversiones, regresarDinero} = require('../controllers/inversionesController.js');
const { notificarInversion, buscarNotificaciones, obtenerNotificaciones } = require('../controllers/notificacionesController');
const { deductMoney, informacionUsuario } = require('../controllers/registroUsersController');
const passport = require('passport');
const config = require('../config/config.json');
const { Sequelize } = require('sequelize');

//obtiene todas sus inversiones que ha realizado el usuario
app.get('/inversiones/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const obtenerOportunidad = await obtenerInversiones(userId);

        console.log(obtenerOportunidad);
        res.status(200).send({
            messsage: "Se ha obtenido la informacion correctamente",
            data: obtenerOportunidad
        })
    }
    catch (error) {
        console.log('Error Internal Server :', error)
    }
})
/**
 * busca si tiene dinero para poder invertir, en caso de que si
 * le descuenta dinero, le descuenta dinero a la inversion,  y le notifica la inversion
 */
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
            var agregarInversion = await inversionRealizada(name, amount, id, fkUser); 
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

// elmina la inversion del usuario y le regresa su dinero
app.delete('/retirar/inversion/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const inversionesUsuario = await deleteInversionesUsuario(userId);

        if(inversionesUsuario){
            var dineroUser = inversionesUsuario.Inversion
            const regresarDineroUsuario = await regresarDinero(userId, dineroUser);
        }

        res.status(200).send({
            message: 'Se ha eliminado correctamente'
        })
        
    }
    catch (error) {
        console.log('Error Internal Server', error);
    }
})
// obtiene todas las notificacion que tenga el usuario
app.get('/obtener/notificaciones/:id', async (req, res) =>{
    try{
        const userId = req.params.id;
        const notificaciones = await buscarNotificaciones(userId);

        res.status(200).send({
            data : notificaciones
        })
    
    }
    catch(error){
        console.log('Error Internal Server', error);
    }
})

// obtiene todas notificaciones creadas de todos los usuarios
app.get('/obtener/all/notificacion', async (req, res) => {
    try{
        const notificaciones = await obtenerNotificaciones();

        res.status(200).send({
            data : notificaciones 
        })
    }  
    catch(error){
        console.log('Error Internal Server', error);
    }
})
// obtiene todas las oportunidades para invertir
app.get('/obtener/oportunidades', async (req, res) =>{
    try{
        const oportunidades = await obtenerOportunidades();

        res.status(200).send({
            message : 'Oportunidades traidas coreectamente',
            data : oportunidades
        })

    }  
    catch(error){
        console.log('Error Internal Server', error);
    }
})
module.exports = app