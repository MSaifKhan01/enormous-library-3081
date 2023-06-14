const express=require('express')

const db=require('./models/index')

const userrouter = require('./routes/user.router')

// const auth = require('./middleware/auth')
require("dotenv").config()
const app=express()
app.use(express.json())

app.use("/user",userrouter)



db.sequelize.sync().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`Server Started at port ${process.env.port}`)
    })
})
