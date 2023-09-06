CREATE OR ALTER PROCEDURE sendNotification(@UserID INT,@SenderID INT,@NotificationText NVARCHAR(MAX))
AS 
BEGIN
INSERT INTO Notifications(UserID,SenderID,NotificationText)
VALUES(@UserID,@SenderID,@NotificationText)
END;

