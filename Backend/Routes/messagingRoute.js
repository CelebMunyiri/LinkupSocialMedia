const Router=require('express')
const { sendMessage, receiveMessage } = require('../Controllers/messagingController')


const messagingRouter=Router()

messagingRouter.post('/send',sendMessage)
messagingRouter.get('/receive/:user1ID/:user2ID',receiveMessage)

module.exports={
    messagingRouter
}