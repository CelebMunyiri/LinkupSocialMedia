CREATE PROCEDURE createResetToken
  @userEmail NVARCHAR(255),
  @resetToken NVARCHAR(255),
  @expiration DATETIME
AS
BEGIN
  INSERT INTO resetTokens (userEmail, resetToken, expiration)
  VALUES (@userEmail, @resetToken, @expiration);
END;