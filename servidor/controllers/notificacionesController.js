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

module.exports = {
    notificarInversion
}