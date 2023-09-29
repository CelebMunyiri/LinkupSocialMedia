CREATE OR ALTER PROCEDURE updatePostProc(@PostID INT,@PostContent NVARCHAR(200),@ImageUrl VARCHAR(MAX))
AS 
BEGIN 
UPDATE Posts
SET PostContent=@PostContent, ImageUrl=@ImageUrl
WHERE PostID=@PostID
END;