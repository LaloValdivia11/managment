const { DataTypes, Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

const Users = sequelize.define('Users', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address : {
        type : DataTypes.STRING,
        allowNull: null
    },
    Email : {
        type: DataTypes.STRING
    },
    Password :{
        type : DataTypes.STRING
    },
    Amount:{
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Users'
});
 
Users.beforeCreate(async (user) =>{
    const saltRounds = 10;
    user.Password = await bcrypt.hash(user.Password, saltRounds);
});

Users.beforeCreate(async (user) => {
    user.Amount = 1000; 
});

/**
 * descomentar esta linea de codigo en caso de quen o tenga usuarios 
 */
/**** 
sequelize.sync({ force: true }).then(async () => {    
    const usuario1 = await Users.create({
        Name: "Eduardo",
        Age: 23,
        LastName: "Valdivia",
        Address: 'Plutarco Elias calles',
        Email: 'eduardo11@gmail.com',
        Password: '123456'
      });
      
      const usuario2 = await Users.create({
        Name: "Juan",
        Age: 25,
        LastName: "Perez",
        Address: 'Avenida Principal',
        Email: 'juan.perez@gmail.com',
        Password: 'password123'
      });
      
      const usuario3 = await Users.create({
        Name: "Maria",
        Age: 28,
        LastName: "Lopez",
        Address: 'Calle Rosas',
        Email: 'maria.lopez@gmail.com',
        Password: 'securepass'
      });
      
      const usuario4 = await Users.create({
        Name: "Carlos",
        Age: 30,
        LastName: "Gomez",
        Address: 'Calle Sol',
        Email: 'carlos.gomez@gmail.com',
        Password: 'letmein'
      });
      
      const usuario5 = await Users.create({
        Name: "Ana",
        Age: 22,
        LastName: "Martinez",
        Address: 'Avenida Libertad',
        Email: 'ana.martinez@gmail.com',
        Password: 'pass123'
      });
      
    const user = await Users.findAll();
    console.log(user);
}) 

*/

module.exports = Users;


