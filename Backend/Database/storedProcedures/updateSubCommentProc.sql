CREATE OR ALTER PROCEDURE updateSubComment(@SubCommentID INT,@SubCommentContent VARCHAR(500))
AS 
BEGIN
UPDATE SubComments
SET SubCommentContent=@SubCommentContent
WHERE SubCommentID=@SubCommentID
END;