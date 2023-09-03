CREATE TABLE Posts (
    PostID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PostContent NVARCHAR(MAX) NOT NULL,
    PostType NVARCHAR(10) NOT NULL,
    CreatedAt DATE DEFAULT GETDATE(),
    -- Other post-related fields (e.g., media URL, like count)
);   

