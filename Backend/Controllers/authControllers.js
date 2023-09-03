const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config()

const registerUser=async(req,res)=>{
    try {
        const {Username,Email,PasswordHash}=req.body

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
                const {PasswordHash,userID,...payload}=user
                const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'360000'})
                return res.status(200).json({message:"Logged in Succesful",token,userID})
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

module.exports={
    registerUser,loginUser
}