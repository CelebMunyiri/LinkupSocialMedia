const express=require('express')

const { authRouter } = require('./Routes/authRoutes')
const app=express()

app.use(express.json())



app.use('/user',authRouter)

app.listen(4600,()=>{
    console.log('server Running on port 4600')
})