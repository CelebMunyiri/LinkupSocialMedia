CREATE OR ALTER PROCEDURE viewAllPosts
AS 
BEGIN 
 SELECT * FROM Posts P
SELECT U.Username AS Username,U.Email AS Email,U.UserProfile AS Profile FROM Users U
INNER JOIN Posts P ON U.UserID= P.UserID
WHERE U.UserID=P.UserID
END;

