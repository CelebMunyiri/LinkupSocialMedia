CREATE OR ALTER PROCEDURE FollowProc(@UserID INT,@FollowerUserID INT)
AS 
BEGIN 
INSERT INTO Followers(UserID,FollowerUserID)
VALUES (@UserID,@FollowerUserID)
END;

select * from Followers