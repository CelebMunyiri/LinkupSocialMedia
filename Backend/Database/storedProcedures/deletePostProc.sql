CREATE OR ALTER PROCEDURE deletePostProc(@PostID INT)
AS 
BEGIN 
DELETE FROM Posts
WHERE PostID=@PostID
END;

