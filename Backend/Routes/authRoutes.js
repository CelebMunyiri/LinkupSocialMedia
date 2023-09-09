const Router=require('express')
const { registerUser, loginUser, updateUserBio, viewAllUsers } = require('../Controllers/authControllers')
const authRouter=Router()

authRouter.post('/register',registerUser)
authRouter.post('/login', loginUser)
authRouter.put('/update/:UserID',updateUserBio)
authRouter.get('/allUsers',viewAllUsers)

module.exports={
    authRouter
}