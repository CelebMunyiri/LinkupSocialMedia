ALTER TABLE Messages
ADD CONSTRAINT FK_Messages_SenderUser FOREIGN KEY (SenderID)
REFERENCES Users (UserID);

ALTER TABLE Messages
ADD CONSTRAINT FK_Messages_ReceiverUser FOREIGN KEY (ReceiverID)
REFERENCES Users (UserID);

ALTER TABLE Messages
ALTER COLUMN MessageType NVARCHAR(50) NULL;