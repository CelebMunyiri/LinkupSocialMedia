
CREATE OR ALTER PROCEDURE ViewFollowersOfUser
    @UserID INT
AS
BEGIN
    SELECT U.Username AS FollowerUsername, U.UserID AS FollowerID, U.UserProfile AS FollowerProfile 
    FROM Users U
    INNER JOIN Followers F ON U.UserID = F.FollowerUserID
    WHERE F.UserID = @UserID;
END;

