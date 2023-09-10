CREATE OR ALTER PROCEDURE GetMessagesBetweenUsers
    @User1ID INT,
    @User2ID INT
AS
BEGIN
    SELECT MessageID, SenderID, ReceiverID, MessageContent, CreatedAt
    FROM Messages
    WHERE (SenderID = @User1ID AND ReceiverID = @User2ID)
       OR (SenderID = @User2ID AND ReceiverID = @User1ID)
    ORDER BY CreatedAt;
END;

