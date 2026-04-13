const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db-connections")
const User = sequelize.define("Users",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
})

module.exports = User;