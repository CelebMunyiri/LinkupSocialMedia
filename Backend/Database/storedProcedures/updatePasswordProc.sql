CREATE OR ALTER PROCEDURE updatePassword
  @userEmail NVARCHAR(255),
  @newPassword NVARCHAR(255)
AS
BEGIN
  UPDATE Users
  SET PasswordHash = @newPassword
  WHERE Email = @userEmail;
END;