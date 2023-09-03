CREATE TABLE Messages (
    MessageID INT PRIMARY KEY IDENTITY(1,1),
    SenderID INT NOT NULL,
    ReceiverID INT NOT NULL,
    MessageType NVARCHAR(10) NOT NULL,
    MessageContent NVARCHAR(MAX) NOT NULL,
    CreatedAt DATE DEFAULT GETDATE(),
);


