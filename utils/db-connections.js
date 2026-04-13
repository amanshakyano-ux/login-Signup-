require("dotenv").config()
const {Sequelize} = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql"
    }
);

(async()=>{
    try{

        await sequelize.authenticate();
        console.log("DB CONNECTED SUCCESSFULLY")
        
    }catch(err){
        console.log("DB ERROR ENCOUTERD!!")
    }
})

module.exports = sequelize;