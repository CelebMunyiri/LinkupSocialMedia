CREATE OR ALTER PROCEDURE deletePostProc(@PostID INT)
AS 
BEGIN 
DELETE FROM Posts
WHERE PostID=@PostID
END;

-- CREATE OR ALTER PROCEDURE deletePostProc
--     @PostID INT
-- AS
-- BEGIN
--     -- Delete comments associated with the post
--     DELETE FROM Comments
--     WHERE PostID = @PostID;

--     -- Delete the post
--     DELETE FROM Posts
--     WHERE PostID = @PostID;

--     -- Commit the transaction
--     COMMIT;
-- END;

