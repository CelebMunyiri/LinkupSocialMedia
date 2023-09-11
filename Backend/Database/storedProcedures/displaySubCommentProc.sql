CREATE OR ALTER PROCEDURE DisplayAllSubComments(@CommentID INT)
AS 
BEGIN 
SELECT 
SubComments.SubCommentID,
    SubComments.CommentID,
    SubComments.SubCommentContent,
    SubComments.UserID AS SubCommentUserID,
    Users.Username AS SubCommentUsername,
    Users.Email AS SubCommentEmail,
    Users.UserProfile AS SubCommentProfileImage
    FROM
    SubComments
INNER JOIN
    Users ON SubComments.UserID = Users.UserID
WHERE
    SubComments.CommentID = @CommentID;
    END;