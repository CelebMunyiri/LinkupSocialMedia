const Router=require('express')
const { createComment, deleteComment } = require('../Controllers/commentController')
const commentRouter=Router()

commentRouter.post("/createComment",createComment)
commentRouter.delete('/deleteComment/:CommentID',deleteComment)

module.exports={
    commentRouter
}