const Route=require('express')
const { sendNotification, getNotification } = require('../Controllers/notificationsController')
const notificationRoute=Route()

notificationRoute.post('/send',sendNotification)
notificationRoute.get('/get/:UserID',getNotification)

module.exports={
    notificationRoute
}