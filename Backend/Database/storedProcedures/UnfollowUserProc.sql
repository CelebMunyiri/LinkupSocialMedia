CREATE OR ALTER PROCEDURE UnfollowProc(@UserID INT, @FollowerUserID INT)
AS 
BEGIN 
DELETE FROM Followers 
WHERE UserID=@UserID AND FollowerUserID=@FollowerUserID
END; 