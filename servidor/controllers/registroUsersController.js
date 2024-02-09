const express = require('express');
const Users = require('../models/User');

const registroUser = async (_name, _age, _lastName, _address, _email, _password) => {
    try {
        const user = await Users.create({
            Name: _name,
            Age: _age,
            LastName: _lastName,
            Address: _address,
            Email: _email,
            Password: _password,
        });
        return user
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

const deductMoney= async(_id, _amount) =>{
    try{
        const userMoney = Users.update( { Amount : _amount}, {where : {id : _id}});
        return userMoney;
    }
    catch(error){
        console.log('Error fetchin money :' , error);
    }
} 

const informacionUsuario = async (_id) =>{
    try{
        const dataUser = Users.findOne({id : _id })
        return dataUser;
    }
    catch(error){
        console.log();
    }
}

module.exports ={
    registroUser,
    deductMoney,
    informacionUsuario 
}
