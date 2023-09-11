const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')


const createSubComment=async(req,res)=>{
    try {
        const {UserID,CommentID,SubCommentContent}=req.body
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input('UserID',UserID)
        .input('CommentID',CommentID)
        .input('SubCommentContent',SubCommentContent)
        .execute('addSubComment'))
        if(result){
            return res.status(200).json({message:"SubComment created Sucessfully"})
        } else{
            return res.status(401).json({message:"Failed to Add SubComment"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const updateSubComment=async(req,res)=>{
    try {
        const SubCommentID=req.params.SubCommentID
        const {SubCommentContent}=req.body

        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input('SubCommentID',SubCommentID)
        .input('SubCommentContent',mssql.VarChar, SubCommentContent)
        .execute('updateSubComment'))
        if(result){
            return res.status(200).json({message:"SubCommengt updated Successfully"})
        } else{
            return res.status(401).json({message:"Failed Updating SubComment"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error:error.message})
    }
}

const deleteSubComment=async(req,res)=>{
    try {
        const SubCommentID=req.params.SubCommentID
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input('SubCommentID',SubCommentID)
        .execute('deleteSubComment'))
        if(result){
            return res.status(200).json({message:"SubCommentDeleted Successful"})
        } else{
            return res.status(401).json({message:"Failed Deleting SubComment"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const viewAllSubComments=async(req,res)=>{
    try {
        const CommentID=req.params.CommentID
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input('CommentID',CommentID)
        .execute('DisplayAllSubComments')).recordsets
        if(result){
            return res.status(200).json({result})
        } else{
            return res.status(401).json({message:"failed fetching subcomments for this Comment"})
        }

    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

module.exports={
    createSubComment,updateSubComment,deleteSubComment,viewAllSubComments
}