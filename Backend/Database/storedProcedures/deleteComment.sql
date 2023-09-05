CREATE OR ALTER PROCEDURE deleteCommentProc(@CommentID INT)
AS 
BEGIN 
DELETE FROM Comments 
WHERE CommentID=@CommentID
END; 

