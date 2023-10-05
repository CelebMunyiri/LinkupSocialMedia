const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')
const { DB } = require('../Helpers/dbHelper')

const createPost=async(req,res)=>{
    try {
        const {UserID,PostContent,VideoUrl,ImageUrl}=req.body

    
    const post=await DB.exec('createPostProc',{UserID,PostContent,VideoUrl,ImageUrl})

    if(post.rowsAffected==1){
        return res.status(200).json({message:'Post Created Successfully'})
    } else{
        return res.status(401).json({message:"Failed to create post"})
    }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const deletePost=async(req,res)=>{
    try {
        const PostID=req.params.PostID

    
        const result=await DB.exec('deletePostProc',{PostID})
        if(result.rowsAffected==1){
            return res.status(200).json({message:"Post Deleted successfully"})
        } else{
            return res.status(401).json({message:"Failed deleting Post"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const viewAllPosts=async(req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .execute('viewAllPosts')).recordsets

        if(result){

            return res.status(200).json({result})
        } else{
            return res.status(401).json({message:"Failed to load posts"})
        }
    } catch (error) {
      return res.status(402).json({Error:error.message})  
    }
}

const updatePost=async(req,res)=>{
    try {
        const {PostID}=req.params

        const {PostContent,ImageUrl}=req.body

        await DB.exec('updatePostProc',{PostID,PostContent,ImageUrl})

            if(result.rowsAffected==1){
                return res.status(200).json({message:"Post updated successfully"})
            } else{
                return res.status(401).json({message:"Failed updating the post"})
            }
        
    } catch (error) {
        return res.status(500).json({Error:error.message})
    }
}


module.exports={
    createPost,deletePost, viewAllPosts,updatePost
}