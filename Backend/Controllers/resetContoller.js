const { generateUniqueToken, saveResetTokenToDatabase, sendResetEmail, getTokenInfoFromDatabase, updatePasswordInDatabase, deleteTokenFromDatabase } = require("./resetPasswordController");


const resetRequest=async (req, res) => {
    try {
        const { userEmail } = req.body;
  
    // Generate a unique reset token
    const resetToken = generateUniqueToken();
  
    //here i save the reset token in the database where we have the email for resetting password against the user email in the resetTable
    await saveResetTokenToDatabase(userEmail, resetToken, Date.now() + 3600000); // Expire after 1 hour
  
    // Send an email to the user containing the reset link
    const resetCode = `${resetToken}`;
    sendResetEmail(userEmail, resetCode);
  
    return res.status(200).json({message:'Password reset email sent.'});
    } catch (error) {
        return res.json({Error:error.message})
    }
  }

const resetPassword=async (req, res) => {
   try {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    // Verify the token and its expiration time which is one hour
    const tokenInfo = await getTokenInfoFromDatabase(token);
    if (!tokenInfo || tokenInfo.expiration < Date.now()) {
      return res.status(400).json({message:'Invalid or expired token.'});
    }
  
    // Update the user's password in the database
    const userEmail = tokenInfo.userEmail;
    await updatePasswordInDatabase(userEmail, newPassword);
  
    // Remove the used token from the database
    await deleteTokenFromDatabase(token);
  
    res.status(200).json({message:'Password updated successfully.'});
   } catch (error) {
    return res.json({Error:error.message})
   }
  }

  module.exports={
    resetPassword,resetRequest
  }