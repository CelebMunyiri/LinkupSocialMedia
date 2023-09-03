CREATE TABLE Calls (
    CallID INT PRIMARY KEY IDENTITY(1,1),
    CallerID INT NOT NULL,
    ReceiverID INT NOT NULL,
    CallType NVARCHAR(10) NOT NULL,
    CallStatus NVARCHAR(20) NOT NULL,
    StartTime DATE DEFAULT GETDATE(),
    EndTime DATE DEFAULT GETDATE(),
);
