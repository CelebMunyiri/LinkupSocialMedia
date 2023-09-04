const Router=require('express')
const { registerUser, loginUser, updateUserBio } = require('../Controllers/authControllers')
const authRouter=Router()

authRouter.post('/register',registerUser)
authRouter.post('/login', loginUser)
authRouter.put('/update/:UserID',updateUserBio)

module.exports={
    authRouter
}