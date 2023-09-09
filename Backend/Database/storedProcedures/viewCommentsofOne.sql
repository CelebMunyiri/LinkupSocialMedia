-- CREATE OR ALTER PROCEDURE viewCommentsofOne(@PostID INT)
-- AS 
-- BEGIN 
-- SELECT * FROM Comments 
-- WHERE PostID=@PostID
-- END;

CREATE OR ALTER PROCEDURE viewCommentsofOne(@PostID INT)
AS 
BEGIN 
SELECT
    Comments.CommentID,
    Comments.CommentText,
    Comments.PostID,
    Users.UserID,
    Users.Username,
    Users.Email,
    Users.UserProfile
FROM
    Comments
INNER JOIN
    Users
ON
    Comments.UserID = users.UserID
WHERE
    Comments.PostID = @PostID;
END;