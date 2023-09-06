const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')

const likePost=async(req,res)=>{
    try {
        const {UserID,PostID}=req.body

        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("UserID",UserID)
        .input("PostID",PostID)
        .execute('likePostProc'))

        if (result.rowsAffected==1){
return res.status(200).json({message:"Post liked as success"})
        } else{
            return res.status(401).json({message:"Failed to like the post"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const unlikePost=async(req,res)=>{
    try {
        const LikeID=req.params.LikeID

        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("LikeID",LikeID)
        .execute("unlikePostProc"))
        if(result.rowsAffected==1){
            return res.status(200).json({message:"Post unliked successfully"})
        } else{
            return res.status(401).json({message:"Failed to unlike post"})
        }
    } catch (error) {
       return res.status(402).json({Error:error.message}) 
    }
}

module.exports={
    likePost,unlikePost
}