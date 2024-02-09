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


/****
sequelize.sync({ force: true }).then(async () => {
    
    const newOportunidad1 = await Users.create({
      Name : "Eduardo",
      Age : 23,
      LastName : "Valdivia",
      Address : 'Plutarco Elias calles',
      Email : 'eduardo11@gmail.com',
      Password : '123456'
    });
    

    const user = await Users.findAll();
    console.log(user);
}) 
*/

module.exports = Users;


