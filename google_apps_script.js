/**
 * ====================================================================
 * MATH BATTLE - DAILY 24-HOUR ACCESS CODE & GMAIL BACKEND
 * ====================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open https://script.google.com/ in your browser (logged into your Gmail).
 * 2. Click "New Project" (top left).
 * 3. Delete any default code in Code.gs, and paste this entire code.
 * 4. Change OWNER_EMAIL below to your personal Gmail address.
 * 5. Click "Deploy" (top right) -> "New deployment".
 * 6. Click the gear icon next to "Select type" -> choose "Web app".
 * 7. Set:
 *    - Description: Math Battle Access Code API
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone"   <--- (VERY IMPORTANT)
 * 8. Click "Deploy", authorize access with your Google account.
 * 9. Copy the generated "Web app URL" (it ends with /exec).
 * 10. Paste that URL into index.html at `const GAS_WEBAPP_URL = "YOUR_URL_HERE";`
 * ====================================================================
 */

// ══════════════════════════════════════════════════════════════════════
// 1. JIS EK ADDRESS PAR MAIL BHEJNA HAI, WO EMAIL YAHAN DAALEIN:
// (Mail aapke Gmail se send hoga aur SIRF is ek address par deliver hoga)
// ══════════════════════════════════════════════════════════════════════
const RECEIVER_EMAIL = "your_email@gmail.com";

// 2. Main HTTP Request Handler (Supports both GET & POST)
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const action = params.action || "";

  // Get current date formatted in IST (India Standard Time: yyyy-MM-dd)
  const todayStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd");
  const scriptProps = PropertiesService.getScriptProperties();

  // ACTION 1: SEND CODE TO GMAIL
  if (action === "send_code") {
    let todayCode = scriptProps.getProperty("MATH_CODE_" + todayStr);

    // If code for today doesn't exist yet, generate a new random 6-digit code
    if (!todayCode) {
      todayCode = Math.floor(100000 + Math.random() * 900000).toString();
      scriptProps.setProperty("MATH_CODE_" + todayStr, todayCode);
    }

    // Rate-limiting check: Prevent sending duplicate emails within 30 seconds
    const lastSentTime = parseInt(scriptProps.getProperty("LAST_SENT_TIME") || "0", 10);
    const now = new Date().getTime();
    if (now - lastSentTime < 30000) {
      return jsonResponse({
        success: true,
        alreadySent: true,
        message: "Code was already sent recently. Please check your Gmail inbox (or spam folder)!"
      });
    }

    // Send email to owner's Gmail
    const subject = "🔑 Math Battle - Access Code for " + todayStr;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background: #0b0f19; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 480px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
        <h2 style="color: #a855f7; margin-bottom: 8px;">🎮 Math Battle Access Code</h2>
        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
          A request to view today's access code was triggered from your Math Battle game.
        </p>
        <div style="background: rgba(124, 58, 237, 0.15); border: 2px dashed #a855f7; border-radius: 10px; padding: 18px; text-align: center; margin-bottom: 20px;">
          <span style="font-size: 12px; text-transform: uppercase; color: #cbd5e1; letter-spacing: 1px;">Today's Access Code</span><br/>
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #ffffff; font-family: monospace;">${todayCode}</span>
        </div>
        <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">
          • <strong>Validity:</strong> Works for the entire day (${todayStr}).<br/>
          • <strong>Same Day Rule:</strong> This code stays the same for today. After 24 hours, a new code will automatically generate.<br/>
          • Anyone entering this code can access Math Battle for 24 hours.
        </p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">Math Battle Automatic Security System</p>
      </div>
    `;

    MailApp.sendEmail({
      to: RECEIVER_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });

    scriptProps.setProperty("LAST_SENT_TIME", now.toString());

    return jsonResponse({
      success: true,
      message: "Access code has been sent to " + RECEIVER_EMAIL + "!"
    });
  }

  // ACTION 2: VERIFY CODE
  if (action === "verify_code") {
    const enteredCode = (params.code || "").trim();
    let todayCode = scriptProps.getProperty("MATH_CODE_" + todayStr);

    // If code for today wasn't generated yet, generate it now
    if (!todayCode) {
      todayCode = Math.floor(100000 + Math.random() * 900000).toString();
      scriptProps.setProperty("MATH_CODE_" + todayStr, todayCode);
    }

    if (enteredCode === todayCode) {
      return jsonResponse({
        success: true,
        valid: true,
        message: "Code verified successfully! Access granted for 24 hours."
      });
    } else {
      return jsonResponse({
        success: false,
        valid: false,
        message: "Invalid code for today! Please check your email or click Send Code."
      });
    }
  }

  return jsonResponse({
    success: false,
    message: "Unknown action parameter."
  });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
