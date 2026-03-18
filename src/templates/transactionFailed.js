export default ({
    name = "User",
    fromAccount,
    toAccount,
    amount,
    date = new Date().toLocaleString()
}) => {

    return `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Transaction Failed</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" style="background:#ffffff;margin:30px auto;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#f59e0b;color:#ffffff;padding:20px;text-align:center;">
              <h2 style="margin:0;">Transaction Failed</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:25px;color:#333;">
              
              <p style="font-size:16px;">Hi <b>${name}</b>,</p>

              <p style="font-size:15px;color:#555;">
                We were unable to process your recent transaction. Don’t worry — no amount has been deducted from your account.
              </p>

              <!-- Amount -->
              <h1 style="color:#dc2626;margin:20px 0;">
                ₹ ${amount}
              </h1>

              <!-- Details -->
              <table width="100%" style="background:#fff7ed;border-radius:10px;padding:15px;">
                
                <tr>
                  <td style="padding:8px 0;"><b>From Account:</b></td>
                  <td style="padding:8px 0;">${fromAccount}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>To Account:</b></td>
                  <td style="padding:8px 0;">${toAccount}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Date:</b></td>
                  <td style="padding:8px 0;">${date}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Status:</b></td>
                  <td style="padding:8px 0;color:#dc2626;"><b>Failed</b></td>
                </tr>

              </table>

              <p style="font-size:14px;color:#555;margin-top:20px;">
                Please check your details and try again. If the issue continues, contact our support team.
              </p>

              <!-- CTA -->
              <div style="margin-top:20px;text-align:center;">
                <a href="#" style="background:#1a73e8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">
                  Try Again
                </a>
              </div>

              <p style="margin-top:25px;">Regards,</p>
              <p style="color:#1a73e8;font-weight:bold;margin-top:-10px;">
                Your Banking Team
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
