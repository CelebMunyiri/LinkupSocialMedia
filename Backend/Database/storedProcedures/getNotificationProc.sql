-- CREATE OR ALTER PROCEDURE getNotification(@UserID INT)
-- AS 
-- BEGIN 
-- SELECT * FROM Notifications
-- WHERE UserId=@UserID
-- END;

CREATE OR ALTER PROCEDURE getNotification(@UserID INT)
AS 
BEGIN
SELECT n.*, u.Username AS SenderName, u.UserProfile AS UserProfile, U.Email AS SenderEmail
FROM Notifications AS n
JOIN Users AS u ON n.SenderID = u.UserID
WHERE n.UserID = @UserID;
END;