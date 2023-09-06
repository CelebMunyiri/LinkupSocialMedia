const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')


const sendNotification=async(req,res)=>{
   try {
    const {UserID,SenderID,NotificationText}=req.body

    const pool=await mssql.connect(sqlConfig)
    const result=(await pool.request()
    .input("UserID",UserID)
    .input("SenderID",SenderID)
    .input("NotificationText",NotificationText)
    .execute('sendNotification'))
    if(result.rowsAffected==1){
        return res.status(200).json({message:"Notification Sent succesfully"})
    } else{
        return res.status(401).json({message:"Failed sending Notification"})
    }
   } catch (error) {
    return res.status(402).json({Error:error.message})
   }
}

const getNotification=async(req,res)=>{
    try {
        const UserID=req.params.UserID
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("UserID",UserID)
        .execute('getNotification')).recordsets

if(result){
    return res.status(200).json({result})
} else{
    return res.status(401).json({message:"Failed to fetch your notifications"})
}
        
    } catch (error) {
       return res.status(402).json({Error:error.message}) 
    }
}
module.exports={
    sendNotification,getNotification
}