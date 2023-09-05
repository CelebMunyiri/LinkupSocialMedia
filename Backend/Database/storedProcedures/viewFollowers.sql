
CREATE OR ALTER PROCEDURE ViewFollowersOfUser
    @UserID INT
AS
BEGIN
    SELECT U.Username AS FollowerUsername
    FROM Users U
    INNER JOIN Followers F ON U.UserID = F.FollowerUserID
    WHERE F.FollowerUserID = @UserID;
END;

