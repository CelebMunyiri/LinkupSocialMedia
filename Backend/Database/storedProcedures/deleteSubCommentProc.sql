CREATE OR ALTER PROCEDURE deleteSubComment(@SubCommentID INT)
AS 
BEGIN 
DELETE 
FROM SubComments
WHERE SubCommentID=@SubCommentID
END;