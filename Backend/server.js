const express=require('express')
const helmet=require('helmet')
const cors=require('cors')
const bodyParser=require('body-parser')

const { authRouter } = require('./Routes/authRoutes')
const { followActionsRouter } = require('./Routes/followActionRoutes')
const { postRouter } = require('./Routes/postRoutes')
const { commentRouter } = require('./Routes/commentRoutes')
const { likeRouter } = require('./Routes/likeRoutes')
const { notificationRoute } = require('./Routes/notificationRoute')
const { messagingRouter } = require('./Routes/messagingRoute')
const { subCommentRoute } = require('./Routes/subCommentRoutes')
const { resetRoute } = require('./Routes/resetPasswordRoute')
const app=express()
app.use(express.json())

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public', { 'Content-Type': 'application/javascript' }));

app.use(helmet())



app.use('/user',authRouter)
app.use('/followActions',followActionsRouter)
app.use('/postActions',postRouter)
app.use('/commentActions',commentRouter)
app.use('/like',likeRouter)
app.use('/notification',notificationRoute)
app.use('/messaging',messagingRouter)
app.use('/subComment',subCommentRoute)
app.use('/reset',resetRoute)

app.listen(4600,()=>{
    console.log('server Running on port 4600')
})