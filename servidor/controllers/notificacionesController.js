const NotificacionesUsuarios = require('../models/NotificacionesUsuarios');

const notificarInversion = async (_fkUser, _name, _amount) =>{
    try {
        
        const createNotificacion = await NotificacionesUsuarios.create({
            fkUser: _fkUser,
            descripcion: `Hola, ${_name} acabas de realizar una inversión de $ ${_amount} pesos`
        });
    
        return createNotificacion;
    } catch (error) {
        console.log('Error al crear la notificación:', error);
    }
    
}

const buscarNotificaciones = async (_id) => {
    try {
        const buscarNotificacion = await NotificacionesUsuarios.findAll({
            where: {
                fkUser: _id
            }
        });        

        return buscarNotificacion
    } catch (error) {
        console.log('Error al crear la notificación:', error);
    }
}

const obtenerNotificaciones = async () =>{
    try {
      const notificacion = await NotificacionesUsuarios.findAll();

      return notificacion
    } catch (error) {
        console.log('Error al obtener la notificación:', error);
    }
}

module.exports = {
    notificarInversion,
    buscarNotificaciones,
    obtenerNotificaciones
}