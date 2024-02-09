const { where } = require('sequelize');
const Oportunidades = require('../models/Oportunidades');

const obtenerOportunidades = async () =>{
    try{
        const oportunidades = await  Oportunidades.findAll();
        return oportunidades
    }
    catch(error){
        console.error('Error fetching opportunities:', error.message);
        throw error; 
    }
}

const buscarOportunidad = async (_id) => {
    try{
        const oportunidad = await  Oportunidades.findOne({Id : _id});
        return oportunidad;
    }
    catch(error){
        console.error('Error fetching oportunidad:', error.message);
        throw error
    }
}

const obtenerInversionesUsuario = async (_id) =>{
    try{
        const inversion = await Oportunidades.findAll({id : _id})
        return inversion
    }
    catch(error){
        console.log('Error Fetching inversiones :', error)
    }
}

const retirarInversion = async (_id, _amount) => {

}

const descontarDineroInversion = async(_id, _amount, _fkUser) =>{
    try{
        const descontarDineroInversion = await Oportunidades.update({ TotalAmount : _amount, fkUser : _fkUser},  {where : {Id : _id}})
        return descontarDineroInversion;
    }
    catch(error){
        console.log('Error Fetching inversion' , error);
    }
}

const buscarInversionesUsuario = async (_id) =>{ 
    try{

        const inversiones = await Oportunidades.findAll({
            where: {
              fkUser: _id,
            },
          });
       return  inversiones
    }
    catch(error){
        console.error('Error fetching opportunities:', error.message);
        throw error; 
    }
}
module.exports = {
    obtenerOportunidades,
    buscarOportunidad,
    obtenerInversionesUsuario,
    retirarInversion,
    descontarDineroInversion,
    buscarInversionesUsuario
}