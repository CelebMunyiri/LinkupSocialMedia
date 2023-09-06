const express=require('express')
const helmet=require('helmet')
const { authRouter } = require('./Routes/authRoutes')
const { followActionsRouter } = require('./Routes/followActionRoutes')
const { postRouter } = require('./Routes/postRoutes')
const { commentRouter } = require('./Routes/commentRoutes')
const { likeRouter } = require('./Routes/likeRoutes')
const app=express()

app.use(express.json())
app.use(helmet())



app.use('/user',authRouter)
app.use('/followActions',followActionsRouter)
app.use('/postActions',postRouter)
app.use('/commentActions',commentRouter)
app.use('/like',likeRouter)

app.listen(4600,()=>{
    console.log('server Running on port 4600')
})