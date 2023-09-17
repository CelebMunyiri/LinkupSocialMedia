const Router=require('express')
const { likePost, unlikePost, viewLikesofOne, toggleLike } = require('../Controllers/likeController')
const { verifyToken } = require('../Middleware/protectRoutes')

const likeRouter=Router()

likeRouter.post('/addLike',verifyToken, likePost)
likeRouter.delete('/unlike/:PostID',verifyToken,unlikePost)
likeRouter.get('/likesOfOne/:PostID',viewLikesofOne)
likeRouter.post('/toggleLike',toggleLike)

module.exports={
    likeRouter
}