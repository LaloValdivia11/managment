const { where } = require('sequelize');
const Oportunidades = require('../models/Oportunidades');
const OportunidadesUsuarios = require('../models/OportunidadesUsuarios');

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

const deleteInversionesUsuario = async (_id) => {
    try {
        const inversion = await OportunidadesUsuarios.findByPk(_id);
        if (inversion) {
            await inversion.destroy();
            console.log('Inversión eliminada exitosamente');
            return inversion;
        } else {
            console.log('La inversión no fue encontrada');
            return null;
        }
    } catch (error) {
        console.log('Error al eliminar la inversión:', error);
        throw error;
    }
}


const descontarDineroInversion = async(_id, _amount) =>{
    try{
        const descontarDineroInversion = await Oportunidades.update({ TotalAmount : _amount},  {where : {Id : _id}})
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

const inversionRealizada = async (_name, _amount, _id) =>{
    try{
        const inversion =await OportunidadesUsuarios.create({
            nameUsuario :  _name,
            Inversion :  _amount,
            fkOportunidadUsuario : _id
        });
        return inversion
    
    }
    catch(error){
        console.error('Error fetching inversion:', error.message);
        throw error; 
    }
}
module.exports = {
    obtenerOportunidades,
    buscarOportunidad,
    deleteInversionesUsuario,
    descontarDineroInversion,
    buscarInversionesUsuario,
    inversionRealizada 
}

