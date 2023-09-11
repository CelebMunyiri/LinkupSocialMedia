const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
const { userRegisterValidator } = require('../Validators/validators')
dotenv.config()

const registerUser=async(req,res)=>{
    try {
        const {Username,Email,PasswordHash}=req.body

        const {error}=userRegisterValidator.validate(req.body)

        if(error){
            res.status(422).json(error.details[0].message)
        }

    const pool=await mssql.connect(sqlConfig)

    const hashedPwd=await bcrypt.hash(PasswordHash,7)
const registrationResult=(await pool.request()
.input('Username',Username)
.input('Email',Email)
.input('PasswordHash',hashedPwd)
.execute('registerUserProc'))
if(registrationResult.rowsAffected==1){
    return res.status(200).json({message:"User registered succesfully"})
} else if(registrationResult.rowsAffected==0) {
    return res.status(401).json({message:"Failed Registering user"})
}
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {Email,PasswordHash}=req.body

        const pool=await mssql.connect(sqlConfig)
        const user=(await pool.request()
        .input('Email',Email)
        .execute('userLoginProc')).recordset[0]

        const hashedPwd=user.PasswordHash
        if(user){
            const passwordComparing=await bcrypt.compare(PasswordHash,hashedPwd)

            if(passwordComparing){
                const {PasswordHash,UserID,UserBio,UserProfile,UserBackgroundImage,...payload}=user
                const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'3600000'})
                return res.status(200).json({message:"Logged in Succesful",token,UserID,UserBio,UserProfile,UserBackgroundImage})
            } else{
                return res.status(401).json({message:"Failed to login"})
            }
        } else{
            return res.status(400).json({message:'Wrong Log in Details'})

        }
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}
const updateUserBio=async(req,res)=>{
    try {
        const UserID=req.params.UserID
        const {UserProfile,UserBio,UserBackgroundImage}=req.body 
        const pool=await mssql.connect(sqlConfig)
        const user=(await pool.request()
        .input('UserID',UserID)
        .input('UserProfile',UserProfile)
        .input('UserBio',UserBio)
        .input('UserBackgroundImage',UserBackgroundImage)
        .execute('updateBioProc'))
        if(user.rowsAffected==1){
            return res.status(200).json({message:'Profile Updated Successfully',UserBio,UserBackgroundImage,UserProfile})
        } else{
            return res.status(401).json({message:"Error updating profile"})
        }
    } catch (error) {
        return res.status(402).json({Error:error.message})
    }
}

const viewAllUsers=async(req,res)=>{
   try {
    const pool=await mssql.connect(sqlConfig)
    const result=(await pool.request()
    .execute('displayAllUsers')).recordsets
    if(result){
        return res.status(200).json({result})
    } else{
        return res.status(401).json({message:"Error fetching users"})
    }
   } catch (error) {
    return res.status(402).json({Error:error.message})
   }
}



module.exports={
    registerUser,loginUser,updateUserBio,viewAllUsers
}