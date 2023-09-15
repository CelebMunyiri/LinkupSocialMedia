const Router=require('express')
const { verifyToken } = require('../Middleware/protectRoutes')
const { follow, Unfollow, viewFollowers, viewFollowing } = require('../Controllers/followActions')

const followActionsRouter=Router()

followActionsRouter.post('/follow',follow)
followActionsRouter.post('/unfollow',Unfollow)
followActionsRouter.get('/viewfollowing/:UserID',verifyToken, viewFollowers)
followActionsRouter.get('/viewfollowers/:UserID',viewFollowing)


module.exports={
    followActionsRouter
}