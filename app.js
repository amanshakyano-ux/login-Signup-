require("dotenv").config()
const express = require("express")
const db = require("./utils/db-connections")
require("./models/user")
const userRoutes = require("./routes/userRoutes")


const app = express()


app.use(express.json())
app.use("/user",userRoutes)

 





db.sync({alter:true})
 .then(()=>{
     app.listen(process.env.PORT,(req,res)=>{
    console.log("server is running on port 3000")
})
 })
 .catch((err)=>{
    console.log("ERROR:",err.message)
 })

