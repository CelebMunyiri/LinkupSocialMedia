const Router=require('express')
const { createComment, deleteComment, updateComment, displayAllComments, getCommentsOfOne } = require('../Controllers/commentController')
const commentRouter=Router()

commentRouter.post("/createComment",createComment)
commentRouter.delete('/deleteComment/:CommentID',deleteComment)
commentRouter.put('/updateComment/:CommentID',updateComment)
commentRouter.get('/viewAllComments',displayAllComments)
commentRouter.get('/commentsOfOne/:UserID',getCommentsOfOne)

module.exports={
    commentRouter
}