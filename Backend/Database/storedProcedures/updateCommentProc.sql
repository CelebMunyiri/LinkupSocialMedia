CREATE OR ALTER PROCEDURE updateCommentProc(@CommentID INT,@CommentText NVARCHAR(200))
AS 
BEGIN 
UPDATE Comments 
SET CommentText=@CommentText
WHERE CommentID=@CommentID
END;