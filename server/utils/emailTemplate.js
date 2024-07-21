const verifyEmailTemplate = (user, OTP) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 20px 0; background-color: #007bff; color: #ffffff; }
        .content { padding: 20px; }
        .content h1 { color: #333333; }
        .content p { font-size: 16px; line-height: 1.5; color: #555555; }
        .otp { display: inline-block; background-color: #f7f7f7; padding: 10px 20px; font-size: 18px; color: #333333; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 14px; color: #777777; background-color: #f7f7f7; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <h1>Hello ${user.firstName},</h1>
            <p>Thank you for registering with us. Please use the following OTP to complete your email verification:</p>
            <div class="otp">${OTP.otp}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Chat-App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

const successfullyVerifiedTemplate = (user) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 20px 0; background-color: #007bff; color: #ffffff; }
        .content { padding: 20px; }
        .content h1 { color: #333333; }
        .content p { font-size: 16px; line-height: 1.5; color: #555555; }
        .footer { text-align: center; padding: 20px; font-size: 14px; color: #777777; background-color: #f7f7f7; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verified Successfully</h1>
        </div>
        <div class="content">
            <h1>Hello ${user.firstName},</h1>
            <p>Your email has been successfully verified. Thank you for confirming your email address.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Chat-App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

export { verifyEmailTemplate, successfullyVerifiedTemplate }
