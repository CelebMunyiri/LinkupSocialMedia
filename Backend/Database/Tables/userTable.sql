CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(100) NOT NULL,
    UserProfile VARCHAR(200) ,
    UserBio VARCHAR(500),
    UserBackgroundImage VARCHAR(100),
    CreatedAt DATE DEFAULT GETDATE(),
);

select * from Users

