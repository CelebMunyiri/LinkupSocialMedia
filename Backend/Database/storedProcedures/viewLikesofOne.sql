-- CREATE OR ALTER PROCEDURE viewLikesofOne(@UserID INT)
-- AS 
-- BEGIN
-- SELECT  P.VideoUrl AS VideoUrl, P.PostContent AS PostContent, P.ImageUrl AS ImageUrl, P.UserID AS UserID
-- FROM Posts P  
-- INNER JOIN Likes L ON P.PostID=L.PostID
-- WHERE L.UserID=@UserID
-- END;

--implement likes of a post
CREATE OR ALTER PROCEDURE viewLikesofOne(@PostID INT)
AS 
BEGIN
SELECT * FROM Likes
WHERE PostID=@PostID
END;




