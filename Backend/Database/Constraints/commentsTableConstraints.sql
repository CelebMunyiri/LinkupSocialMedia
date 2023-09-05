

ALTER TABLE Comments
ADD CONSTRAINT FK_Comments_User FOREIGN KEY (UserID)
REFERENCES Users (UserID);

ALTER TABLE Comments
ADD CONSTRAINT FK_Comments_Post FOREIGN KEY (PostID)
REFERENCES Posts (PostID);

select* from Posts