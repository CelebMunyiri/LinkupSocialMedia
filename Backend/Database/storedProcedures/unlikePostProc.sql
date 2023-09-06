CREATE OR ALTER PROCEDURE unlikePostProc(@LikeID INT)
AS 
BEGIN 
DELETE FROM Likes
WHERE LikeID=@LikeID
END;

select*from Likes