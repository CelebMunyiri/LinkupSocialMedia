const Router=require('express')
const { likePost, unlikePost, viewLikesofOne } = require('../Controllers/likeController')
const { verifyToken } = require('../Middleware/protectRoutes')

const likeRouter=Router()

likeRouter.post('/addLike',verifyToken, likePost)
likeRouter.delete('/unlike/:PostID',verifyToken,unlikePost)
likeRouter.get('/likesOfOne/:PostID',viewLikesofOne)

module.exports={
    likeRouter
}