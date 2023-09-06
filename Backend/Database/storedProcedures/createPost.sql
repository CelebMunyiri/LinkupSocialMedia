CREATE OR ALTER PROCEDURE createPostProc(@UserID INT,@PostContent VARCHAR(500),@VideoUrl VARCHAR(MAX),@ImageUrl VARCHAR(MAX))
AS 
BEGIN
INSERT INTO Posts(UserID,PostContent,VideoUrl,ImageUrl)
VALUES (@UserID,@PostContent,@VideoUrl,@ImageUrl)
END;

