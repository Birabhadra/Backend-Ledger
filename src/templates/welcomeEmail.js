export default(name = "User") => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Card -->
        <table width="400" cellpadding="0" cellspacing="0" 
          style="background:#ffffff;border-radius:8px;padding:24px;text-align:center;">
          
          <!-- Logo / Title -->
          <tr>
            <td>
              <h2 style="margin:0;color:#333;">Backend Ledger</h2>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="10"></td></tr>

          <!-- Greeting -->
          <tr>
            <td>
              <p style="margin:0;color:#555;font-size:16px;">
                Hi ${name},
              </p>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="10"></td></tr>

          <!-- Message -->
          <tr>
            <td>
              <p style="margin:0;color:#666;font-size:14px;line-height:1.5;">
                Welcome to <strong>Backend Ledger</strong>! 🎉  
                We're excited to have you onboard.
              </p>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="20"></td></tr>

          <!-- Button -->
          <tr>
            <td>
              <a href="#" 
                style="display:inline-block;padding:10px 20px;background:#4CAF50;color:#fff;
                text-decoration:none;border-radius:5px;font-size:14px;">
                Get Started
              </a>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="20"></td></tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="margin:0;color:#999;font-size:12px;">
                If you have any questions, just reply to this email.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;