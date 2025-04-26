# ElderGuard Email Notification System

This document explains how the email notification system works in ElderGuard.

## Overview

The email system sends notifications to caregivers when alerts are triggered, such as:
- Fall detection
- Fire detection
- SOS signals
- Other emergency alerts

## Implementation

The email system is implemented using the following components:

1. **Email Service Library** (`lib/email/emailService.ts`)
   - Contains the core email sending logic
   - Uses Nodemailer to send emails through Gmail SMTP
   - Generates HTML email content using template strings
   - Includes helper functions for styling based on warning type

2. **Email API Endpoint** (`app/api/email/route.ts`)
   - Provides an HTTP API for sending emails
   - Validates request data
   - Calls the email service to send emails

3. **Alert Component** (`components/alert.tsx`)
   - Contains logic for when to send notification emails
   - Tracks which alerts have already triggered emails to avoid duplicates
   - Reads recipient information from localStorage

## How to Use

### Setting Up Credentials

1. Create a `.env.local` file at the project root
2. Add the following variables:
   ```
   GMAIL_EMAIL=your_gmail_address@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   ```
3. Generate an app password from your Google account:
   - Go to your Google Account settings
   - Enable 2-Step Verification if not already enabled
   - Go to App passwords (under "Security")
   - Create a new app password for "ElderGuard"
   - Use this password as GMAIL_APP_PASSWORD

### Configuring Recipient Information

Users should set up their email notification preferences in the Email Settings component:
- Email address to receive alerts
- Name for personalized email greetings

These settings are stored in localStorage:
- `elderguard_email`: The recipient's email address
- `elderguard_name`: The recipient's name

## Troubleshooting

If emails are not being sent:

1. Verify environment variables are properly set
2. Check that Gmail credentials are correct
3. Ensure the recipient email is configured in settings
4. Look for error messages in the server console
5. Gmail may block emails from new sources; check spam folders

## Technical Notes

- The email HTML is generated using template strings to avoid React rendering issues in server components
- Email styling is handled directly in the template with inline CSS for maximum email client compatibility
- Warning colors and icons are dynamically generated based on the warning type

## Security Considerations

- App passwords are only valid for specific applications
- The app uses TLS encryption for email delivery
- Do not commit .env files with credentials to version control
- Consider implementing rate limiting for email sending 