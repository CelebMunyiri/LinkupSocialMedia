const Router=require('express')
const { follow, Unfollow, viewFollowers } = require('../Controllers/followActions')

const followActionsRouter=Router()

followActionsRouter.post('/follow',follow)
followActionsRouter.post('/unfollow',Unfollow)
followActionsRouter.get('/viewfollowers/:UserID',viewFollowers)


module.exports={
    followActionsRouter
}