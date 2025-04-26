import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  userName: string;
  message: string;
  warningType: 'fall' | 'fire' | 'sos' | 'other';
}

// Helper function to get warning color
const getWarningColor = (warningType: SendEmailParams['warningType']): string => {
  switch (warningType) {
    case 'fire':
      return '#FF3D71'; // Red
    case 'fall':
      return '#FFB800'; // Orange/Yellow
    case 'sos':
      return '#1E86FF'; // Blue
    case 'other':
      return '#00C9A7'; // Green
    default:
      return '#5F4BB6'; // Purple
  }
};

// Helper function to get warning icon
const getWarningIcon = (warningType: SendEmailParams['warningType']): string => {
  switch (warningType) {
    case 'fall':
      return '🤕';
    case 'fire':
      return '🔥';
    case 'sos':
      return '🚨';
    case 'other':
      return '⚠️';
    default:
      return '⚠️';
  }
};

// Generate email HTML directly
const generateEmailHtml = ({
  userName,
  message,
  warningType,
}: {
  userName: string;
  message: string;
  warningType: SendEmailParams['warningType'];
}): string => {
  const warningColor = getWarningColor(warningType);
  const warningIcon = getWarningIcon(warningType);
  const currentYear = new Date().getFullYear();

  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="padding: 20px; background-color: #f7f7f7; border-radius: 5px; margin-bottom: 20px; border-top: 5px solid ${warningColor}">
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td>
              <h1 style="font-size: 24px; color: ${warningColor}; margin-bottom: 15px;">
                ${warningIcon} ElderGuard Alert
              </h1>
              <p style="font-size: 16px; margin-bottom: 10px;">
                Hello ${userName},
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                ${message}
              </p>
              <div style="background-color: ${warningColor}; color: white; padding: 10px 15px; border-radius: 4px; display: inline-block; font-size: 16px;">
                ${warningType.charAt(0).toUpperCase() + warningType.slice(1)} Warning
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                This is an automated alert from the ElderGuard system. Please check the ElderGuard dashboard for more details.
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div style="text-align: center; color: #999; font-size: 12px; padding: 10px;">
        &copy; ${currentYear} ElderGuard. All rights reserved.
      </div>
    </div>
  `;
};

/**
 * Sends an email using nodemailer with a formatted HTML template
 * @returns A promise that resolves to a boolean indicating success or failure
 */
export async function sendEmail({
  to,
  subject,
  userName,
  message,
  warningType,
}: SendEmailParams): Promise<boolean> {
  try {
    // Validate required fields
    if (!to || !subject || !userName || !message || !warningType) {
      console.error('Email sending failed: Missing required fields');
      return false;
    }

    // Validate warning type
    if (!['fall', 'fire', 'sos', 'other'].includes(warningType)) {
      console.error('Email sending failed: Invalid warning type');
      return false;
    }

    // Get email credentials from environment variables
    const email = process.env.GMAIL_EMAIL;
    const password = process.env.GMAIL_APP_PASSWORD;

    if (!email || !password) {
      console.error('Email sending failed: Gmail credentials not configured');
      return false;
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    // Generate email HTML
    const emailHtml = generateEmailHtml({ userName, message, warningType });

    // Send the email
    await transporter.sendMail({
      from: email,
      to,
      subject,
      html: emailHtml,
    });

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
} 