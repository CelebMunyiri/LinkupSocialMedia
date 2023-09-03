CREATE OR ALTER PROCEDURE registerUserProc(@Username VARCHAR(100),@PasswordHash VARCHAR(MAX),@Email VARCHAR(100))
AS 
BEGIN 
INSERT INTO Users(Username,PasswordHash,Email)
VALUES (@UserName,@PasswordHash,@Email)
END;