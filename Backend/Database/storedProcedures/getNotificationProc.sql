CREATE OR ALTER PROCEDURE getNotification(@UserID INT)
AS 
BEGIN 
SELECT * FROM Notifications
WHERE UserId=@UserID
END;