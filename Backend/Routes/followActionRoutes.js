const Router=require('express')
const { follow, Unfollow } = require('../Controllers/followActions')

const followActionsRouter=Router()

followActionsRouter.post('/follow',follow)
followActionsRouter.post('/unfollow',Unfollow)


module.exports={
    followActionsRouter
}