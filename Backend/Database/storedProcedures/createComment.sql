CREATE OR ALTER PROCEDURE createCommentProc(@PostID INT,@UserID INT,@CommentText VARCHAR(200))
AS 
BEGIN 
INSERT INTO
Comments(PostID,UserID,CommentText)
 VALUES
(@PostID,@UserID,@CommentText)
END;