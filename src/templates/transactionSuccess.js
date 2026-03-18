export default (
  type = "credit", // "credit" or "debit"
  name,
  fromAccount,
  toAccount,
  amount,
  transactionId = "TXN123456",
  date = new Date().toLocaleString()
) => {

  const isCredit = type === "credit";

  const title = isCredit ? "Money Received" : "Payment Sent";
  const color = isCredit ? "#16a34a" : "#dc2626";
  const sign = isCredit ? "+" : "-";

  const message = isCredit
    ? "You have received money in your account."
    : "A payment has been made from your account.";

  const counterpartyLabel = isCredit ? "From" : "To";
  const counterpartyAccount = isCredit ? fromAccount : toAccount;

  return `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" style="background:#ffffff;margin:30px auto;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:${color};color:#ffffff;padding:20px;text-align:center;">
              <h2 style="margin:0;">${title}</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:25px;color:#333;">
              
              <p style="font-size:16px;">Hi <b>${name}</b>,</p>

              <p style="font-size:15px;color:#555;">
                ${message}
              </p>

              <!-- Amount Highlight -->
              <h1 style="color:${color};margin:20px 0;">
                ${sign} ${amount}
              </h1>

              <!-- Details -->
              <table width="100%" style="background:#f8fafc;border-radius:10px;padding:15px;">
                
                <tr>
                  <td style="padding:8px 0;"><b>${counterpartyLabel}:</b></td>
                  <td style="padding:8px 0;">${counterpartyAccount}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Your Account:</b></td>
                  <td style="padding:8px 0;">
                    ${isCredit ? toAccount : fromAccount}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Transaction ID:</b></td>
                  <td style="padding:8px 0;">${transactionId}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Date:</b></td>
                  <td style="padding:8px 0;">${date}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;"><b>Status:</b></td>
                  <td style="padding:8px 0;color:${color};"><b>Successful</b></td>
                </tr>

              </table>

              <p style="font-size:13px;color:#777;margin-top:20px;">
                If you did not authorize this transaction, please contact support immediately.
              </p>

              <p style="margin-top:20px;">Regards,</p>
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