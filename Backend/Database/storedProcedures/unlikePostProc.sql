CREATE OR ALTER PROCEDURE unlikePostProc(@PostID INT,@UserID INT)
AS 
BEGIN 
DELETE  FROM  Likes
WHERE PostID=@PostID AND UserID=@UserID
END;

