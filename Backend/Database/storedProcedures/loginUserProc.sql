CREATE OR ALTER PROCEDURE userLoginProc(@Email VARCHAR(100))
AS 
BEGIN 
SELECT * FROM Users
WHERE Email=@Email
END; 