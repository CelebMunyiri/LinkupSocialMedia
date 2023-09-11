 
CREATE TABLE SubComments(
    SubCommentID INT PRIMARY KEY IDENTITY(1,1),
    CommentID INT NOT NULL,
    UserID INT NOT NULL,
    SubCommentContent VARCHAR(500)
)




