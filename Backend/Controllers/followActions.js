const mssql=require('mssql');
const { sqlConfig } = require('../Config/config');

const follow=async(req,res)=>{
    try {
        const { UserID, FollowerUserID } = req.body;

        const pool = await mssql.connect(sqlConfig);
        const result = (await pool.request()
            .input('UserID', mssql.Int, UserID)
            .input('FollowerUserID', mssql.Int, FollowerUserID)
            .execute('FollowProc'))
            
            if(result.rowsAffected==1){
                return res.status(200).json({message:'User Followed succesfully'})
            } else {
                return res.status(401).json({message:"Failed to follow"})
            }
        
    } catch (error) {
       return res.status(402).json({Error:error.message})
    }
}

const Unfollow=async(req,res)=>{
    try {
        const { UserID, FollowerUserID } = req.body;

        const pool = await mssql.connect(sqlConfig);
        const result = (await pool.request()
            .input('UserID', mssql.Int, UserID)
            .input('FollowerUserID', mssql.Int, FollowerUserID)
            .execute('UnfollowProc'))
            
            if(result.rowsAffected==1){
                return res.status(200).json({message:'User Unfollowed succesfully'})
            } else {
                return res.status(401).json({message:"Failed to Unfollow"})
            }
    } catch (error) {
        return res.status(402).json({Error:error.message})   
    }
}

module.exports={
    follow,Unfollow
}