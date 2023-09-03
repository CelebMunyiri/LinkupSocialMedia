CREATE TABLE Followers (
    FollowerID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    FollowerUserID INT NOT NULL,
);
