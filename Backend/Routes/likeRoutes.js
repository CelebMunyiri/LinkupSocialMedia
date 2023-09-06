const Router=require('express')
const { likePost, unlikePost, viewLikesofOne } = require('../Controllers/likeController')

const likeRouter=Router()

likeRouter.post('/addLike',likePost)
likeRouter.delete('/unlike/:LikeID',unlikePost)
likeRouter.get('/likesOfOne/:UserID',viewLikesofOne)

module.exports={
    likeRouter
}