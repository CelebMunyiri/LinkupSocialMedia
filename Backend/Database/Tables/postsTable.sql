CREATE TABLE Posts (
    PostID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PostContent NVARCHAR(MAX),
    VideoUrl VARCHAR(MAX),
    ImageUrl VARCHAR(MAX),
    CreatedAt DATE DEFAULT GETDATE(),
);   



