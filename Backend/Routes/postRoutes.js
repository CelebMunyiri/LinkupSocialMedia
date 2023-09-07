const Router=require('express')
const { createPost, deletePost, viewAllPosts } = require('../Controllers/postController')
const { verifyToken } = require('../Middleware/protectRoutes')
const postRouter=Router()

postRouter.post('/createPost',verifyToken, createPost)
postRouter.delete('/deletePost/:PostID',deletePost)
postRouter.get('/viewAllPosts',verifyToken, viewAllPosts)

module.exports={
postRouter
}