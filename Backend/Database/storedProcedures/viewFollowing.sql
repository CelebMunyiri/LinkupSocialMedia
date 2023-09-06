CREATE OR ALTER PROCEDURE ViewFollowingByUser
    @UserID INT
AS
BEGIN
    SELECT U.Username AS FollowingUsername, U.UserID AS FollowerID, U.UserProfile AS FollowerProfile
    FROM Users U
    INNER JOIN Followers F ON U.UserID = F.FollowerUserID
    WHERE F.UserID = @UserID;
END; 

