const Router=require('express')
const { likePost, unlikePost } = require('../Controllers/likeController')

const likeRouter=Router()

likeRouter.post('/addLike',likePost)
likeRouter.delete('/unlike/:LikeID',unlikePost)

module.exports={
    likeRouter
}