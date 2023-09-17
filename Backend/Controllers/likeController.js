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
        const PostID=req.params.LikeID

        const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
        .input("PostID",PostID)
        .execute("unlikePostProc"))
        if(result.rowsAffected){
            return res.status(200).json({message:"Post unliked successfully"})
        } else{
            return res.status(401).json({message:"Failed to unlike post"})
        }
    } catch (error) {
       return res.status(402).json({Error:error.message}) 
    }
}

const viewLikesofOne=async(req,res)=>{
   try {
    const PostID=req.params.PostID
    const pool=await mssql.connect(sqlConfig)
    const result=(await pool.request()
    .input("PostID",PostID)
    .execute('viewLikesofOne')).recordsets
    if(result){
        return res.status(200).json({result})
    } else {
        return res.status(401).json({message:"failed to fetch the likes of this user"})
    }
   } catch (error) {
    return res.status(402).json({Error:error.message})
   }
}

const toggleLike = async (req, res) => {
    try {
      const { UserID, PostID } = req.body;
  
      const pool = await mssql.connect(sqlConfig);
  
      // Check if the user has already liked the post
      const checkLikeResult = await pool
        .request()
        .input("UserID", UserID)
        .input("PostID", PostID)
        .execute("checkLikeProc");
  
      const isLiked = checkLikeResult.recordset[0].Liked==1;
      
  
      let result;
      if (isLiked) {
        // Unlike the post
        result = await pool
          .request()
          .input("UserID", UserID)
          .input("PostID", PostID)
          .execute("unlikePostProc");
      } else {
        // Like the post
        result = await pool
          .request()
          .input("UserID", UserID)
          .input("PostID", PostID)
          .execute("likePostProc");
      }
  
      if (result.rowsAffected && result.rowsAffected[0] === 1) {
        const message = isLiked ? "Post unliked successfully" : "Post liked successfully";
        return res.status(200).json({ message });
      } else {
        const errorMessage = isLiked ? "Failed to unlike the post" : "Failed to like the post";
        return res.status(401).json({ message: errorMessage });
      }
    } catch (error) {
      return res.status(402).json({ Error: error.message });
    }
  };
  
 
  

module.exports={
    likePost,unlikePost,viewLikesofOne,toggleLike
}