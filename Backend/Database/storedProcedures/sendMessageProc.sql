CREATE OR ALTER PROCEDURE SendMessage
    @SenderID INT,
    @ReceiverID INT,
    @MessageContent NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Messages (SenderID, ReceiverID, MessageContent)
    VALUES (@SenderID, @ReceiverID, @MessageContent);
END;

