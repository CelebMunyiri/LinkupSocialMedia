CREATE OR ALTER PROCEDURE updateBioProc(@UserID INT,@UserBio VARCHAR(500),@UserProfile VARCHAR(100),@UserBackgroundImage VARCHAR(100))
AS 
BEGIN 
UPDATE Users 
SET UserBio=@UserBio, UserProfile=@UserProfile, UserBackgroundImage=@UserBackgroundImage
WHERE UserID=@UserID
END;