import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, userName, message, warningType } = body;

    // Validate required fields
    if (!to || !subject || !userName || !message || !warningType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate warning type
    if (!['fall', 'fire', 'sos', 'other'].includes(warningType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid warning type' },
        { status: 400 }
      );
    }

    // Send the email
    const success = await sendEmail({
      to,
      subject,
      userName,
      message,
      warningType,
    });

    if (success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { success: false, message: `Server error: ${error}` },
      { status: 500 }
    );
  }
}
