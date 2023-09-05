const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')

const createComment=async(req,res)=>{
    try {
        const {PostID,UserID,CommentText}=req.body
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("PostID",PostID)
        .input("UserID",UserID)
        .input("CommentText",CommentText)
        .execute('createCommentProc'))

        if(result.rowsAffected==1){
            return res.status(200).json({message:"Comment Added Successfully"})
        } else{
            return res.status(401).json({message:"Failed Adding Comment"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const deleteComment=async(req,res)=>{
    try {
        const CommentID=req.params.CommentID 
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("CommentID",CommentID)
        .execute('deleteCommentProc'))
        
        if(result.rowsAffected==1){
            return res.status(200).json({message:"Comment deleted succesfully"})
        } else{
            return res.status(401).json({message:"Error deleting Comment"})
        }

    } catch (error) {
        return res.status(402).json({Error:error.message})
        
    }
}



module.exports={
    createComment,deleteComment
}