CREATE OR ALTER PROCEDURE viewCommentsofOne(@UserID INT)
AS 
BEGIN
SELECT  P.VideoUrl AS VideoUrl, P.PostContent AS PostContent, P.ImageUrl AS ImageUrl, P.UserID AS UserID
FROM Posts P  
INNER JOIN Comments C ON P.PostID=C.PostID
WHERE C.UserID=@UserID
END;