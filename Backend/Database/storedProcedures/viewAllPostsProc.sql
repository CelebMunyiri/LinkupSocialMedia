-- CREATE OR ALTER PROCEDURE viewAllPosts
-- AS 
-- BEGIN 
--  SELECT * FROM Posts P
-- SELECT U.Username AS Username,U.Email AS Email,U.UserProfile AS Profile FROM Users U
-- INNER JOIN Posts P ON U.UserID= P.UserID
-- -- WHERE U.UserID=P.UserID

-- END;

CREATE OR ALTER PROCEDURE checkLikeProc
  @UserID INT,
  @PostID INT
AS
BEGIN
  SET NOCOUNT ON;
  
  DECLARE @LikeCount INT;
  
  -- Check if the user has already liked the post
  SELECT @LikeCount = COUNT(*)
  FROM Likes
  WHERE UserID = @UserID AND PostID = @PostID;
  
  SELECT @LikeCount AS Liked;
END;



