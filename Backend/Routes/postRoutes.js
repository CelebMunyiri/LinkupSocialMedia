const Router=require('express')
const { createPost, deletePost, viewAllPosts } = require('../Controllers/postController')
const postRouter=Router()

postRouter.post('/createPost',createPost)
postRouter.delete('/deletePost/:PostID',deletePost)
postRouter.get('/viewAllPosts',viewAllPosts)

module.exports={
postRouter
}