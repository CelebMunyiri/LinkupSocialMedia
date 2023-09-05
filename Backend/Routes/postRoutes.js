const Router=require('express')
const { createPost, deletePost } = require('../Controllers/postController')
const postRouter=Router()

postRouter.post('/createPost',createPost)
postRouter.delete('/deletePost/:PostID',deletePost)

module.exports={
postRouter
}