const Router=require('express')
const { verifyToken } = require('../Middleware/protectRoutes')
const { createComment, deleteComment, updateComment, displayAllComments, getCommentsOfOne } = require('../Controllers/commentController')
const commentRouter=Router()

commentRouter.post("/createComment",verifyToken, createComment)
commentRouter.delete('/deleteComment/:CommentID',deleteComment)
commentRouter.put('/updateComment/:CommentID',updateComment)
commentRouter.get('/viewAllComments',displayAllComments)
commentRouter.get('/commentsOfOne/:PostID',getCommentsOfOne)

module.exports={
    commentRouter
}