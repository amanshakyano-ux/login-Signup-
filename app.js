require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./utils/db-connections")

 


db.sync({force:true})
 .then(()=>{
     app.listen(process.env.PORT,(req,res)=>{
    console.log("server is running on port 3000")
})
 })
 .catch((err)=>{
    console.log("ERROR:",err.message)
 })

