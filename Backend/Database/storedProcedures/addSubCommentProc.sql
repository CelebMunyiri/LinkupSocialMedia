CREATE OR ALTER PROCEDURE addSubComment(@UserID INT,@CommentID INT,@SubCommentContent VARCHAR(200))
AS 
BEGIN
INSERT INTO SubComments(UserID,CommentID,SubCommentContent)
VALUES (@UserID,@CommentID,@SubCommentContent)
END;

SELECT * FROM Likes