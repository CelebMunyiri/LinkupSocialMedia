const Router=require('express')
const { verifyToken } = require('../Middleware/protectRoutes')
const { registerUser, loginUser, updateUserBio, viewAllUsers, getDetailsofuser } = require('../Controllers/authControllers')
const authRouter=Router()

authRouter.post('/register',registerUser)
authRouter.post('/login', loginUser)
authRouter.put('/update/:UserID',verifyToken, updateUserBio)
authRouter.get('/allUsers',viewAllUsers)
authRouter.get('/oneUser/:UserID',getDetailsofuser)

module.exports={
    authRouter
}