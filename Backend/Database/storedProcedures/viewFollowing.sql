CREATE OR ALTER PROCEDURE ViewFollowingByUser
    @UserID INT
AS
BEGIN
    SELECT U.Username AS FollowingUsername
    FROM Users U
    INNER JOIN Followers F ON U.UserID = F.FollowerUserID
    WHERE F.UserID = @UserID;
END; 

