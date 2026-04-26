export type PasswordUpdatedEmailParams = {
  userName: string;
  loginEmail: string;
  loginPassword: string;
  loginUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildPasswordUpdatedEmail(
  params: PasswordUpdatedEmailParams,
) {
  const userName = escapeHtml(params.userName);
  const loginEmail = escapeHtml(params.loginEmail);
  const loginPassword = escapeHtml(params.loginPassword);
  const loginUrl = escapeHtml(params.loginUrl);

  return `
<div style="
  font-family: Arial, Helvetica, sans-serif;
  color:#111827;
  line-height:1.7;
  font-size:14px;
  max-width:620px;
  margin:0 auto;
  padding:0 14px;
  box-sizing:border-box;
">

  <p style="margin:0 0 16px 0;">
    Dear <strong>${userName}</strong>,
  </p>

  <p style="margin:0 0 16px 0;">
    Greetings from <strong>SERVICE INDIA</strong>.
  </p>

  <p style="margin:0 0 16px 0;">
    Your account <strong>Password</strong> has been updated successfully.
    Kindly find your latest login credentials below.
  </p>

  <div style="
    margin:20px auto;
    border:1px solid #bfdbfe;
    border-radius:10px;
    background:#eff6ff;
    max-width:520px;
    width:100%;
    box-sizing:border-box;
    overflow:hidden;
  ">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%;">

      <tr>
        <td style="
          width:42%;
          padding:14px 16px;
          border-bottom:1px solid #bfdbfe;
          font-weight:700;
          color:#1f2937;
          vertical-align:top;
        ">
          Name
        </td>
        <td style="
          padding:14px 16px;
          border-bottom:1px solid #bfdbfe;
          color:#111827;
          vertical-align:top;
        ">
          ${userName}
        </td>
      </tr>

      <tr>
        <td style="
          width:42%;
          padding:14px 16px;
          border-bottom:1px solid #bfdbfe;
          font-weight:700;
          color:#1f2937;
          vertical-align:top;
        ">
          Email
        </td>
       <td style="
  padding:14px 16px;
  border-bottom:1px solid #bfdbfe;
  color:#111827;
  vertical-align:top;
  word-break: break-all;
  overflow-wrap: anywhere;
">
  ${loginEmail}
</td>
      </tr>

      <tr>
        <td style="
          width:42%;
          padding:14px 16px;
          font-weight:600;
          color:#1f2937;
          vertical-align:top;
        ">
          New Password
        </td>
        <td style="
          padding:14px 16px;
          vertical-align:top;
        ">
          <span style="font-weight:700; color:#1d4ed8;">
            ${loginPassword}
          </span>
        </td>
      </tr>

    </table>
  </div>

  <p style="margin:0 0 16px 0;">
    <strong>Login URL:</strong><br>
    <a
      href="${loginUrl}"
      target="_blank"
      style="color:#1d4ed8; text-decoration:none;"
    >
      ${loginUrl}
    </a>
  </p>

  <p style="margin:0 0 16px 0;">
    If you did not authorize this password update, please contact our support team immediately.
  </p>

  <p style="margin:0 0 16px 0;">
    You may now log in using your updated password and continue accessing your dashboard services.
  </p>

  <div style="
    margin-top:20px;
    padding-top:16px;
    border-top:1px solid #e5e7eb;
  ">
    <p style="margin:0 0 10px 0;">
      Warm Regards,<br>
      <strong>SERVICE INDIA</strong>
    </p>

    <p style="margin:0 0 6px 0;">
      Email:
      <a
        href="mailto:corporate@serviceind.co.in"
        target="_blank"
        style="color:#1d4ed8; text-decoration:none;"
      >
        corporate@serviceind.co.in
      </a>
    </p>

    <p style="margin:0 0 6px 0;">
      Website:
      <a
        href="https://www.serviceind.co.in"
        target="_blank"
        style="color:#1d4ed8; text-decoration:none;"
      >
        www.serviceind.co.in
      </a>
    </p>

    <p style="margin:0;">
      Phone:
      <a
        href="tel:+919702485922"
        style="color:#111827; text-decoration:none;"
      >
        +91-9702485922
      </a>
    </p>
  </div>

  <p style="margin:24px 0 0 0; font-size:12px; color:#6b7280;">
    This is a system-generated email. Please do not reply to this message.
  </p>

</div>
  `;
}