const express=require('express')

const { authRouter } = require('./Routes/authRoutes')
const { followActionsRouter } = require('./Routes/followActionRoutes')
const { postRouter } = require('./Routes/postRoutes')
const app=express()

app.use(express.json())



app.use('/user',authRouter)
app.use('/followActions',followActionsRouter)
app.use('/postActions',postRouter)

app.listen(4600,()=>{
    console.log('server Running on port 4600')
})