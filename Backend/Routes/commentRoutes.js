const Router=require('express')
const { createComment, deleteComment, updateComment, displayAllComments } = require('../Controllers/commentController')
const commentRouter=Router()

commentRouter.post("/createComment",createComment)
commentRouter.delete('/deleteComment/:CommentID',deleteComment)
commentRouter.put('/updateComment/:CommentID',updateComment)
commentRouter.get('/viewAllComments',displayAllComments)

module.exports={
    commentRouter
}