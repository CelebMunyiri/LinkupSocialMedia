const Router=require('express')
const { createSubComment, updateSubComment, deleteSubComment, viewAllSubComments } = require('../Controllers/SubCommentController')

const subCommentRoute= Router()

subCommentRoute.post('/addSubComment',createSubComment)
subCommentRoute.put('/update/:SubCommentID',updateSubComment)
subCommentRoute.delete('/delete/:SubCommentID',deleteSubComment)
subCommentRoute.get('/viewAllSubComments/:CommentID',viewAllSubComments)

module.exports={
    subCommentRoute
}