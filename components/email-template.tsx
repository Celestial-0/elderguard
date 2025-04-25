import * as React from 'react';

interface EmailTemplateProps {
  userName: string;
  message: string;
  warningType: 'fall' | 'fire' | 'sos' | 'other';
}

const getWarningColor = (warningType: EmailTemplateProps['warningType']) => {
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

const getWarningIcon = (warningType: EmailTemplateProps['warningType']) => {
  switch (warningType) {
    case 'fall':
      return '🤕';
    case 'fire':
      return '🔥';
    case 'sos':
      return '🚨';
    case 'other':
      return '⚠️';
  }
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  message,
  warningType,
}) => {
  const warningColor = getWarningColor(warningType);
  const warningIcon = getWarningIcon(warningType);
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      maxWidth: '600px',
      margin: '0 auto' 
    }}>
      <div style={{ 
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '5px',
        marginBottom: '20px',
        borderTop: `5px solid ${warningColor}`
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td>
              <h1 style={{ 
                fontSize: '24px',
                color: warningColor,
                marginBottom: '15px' 
              }}>
                {warningIcon} ElderGuard Alert
              </h1>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                Hello {userName},
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                {message}
              </p>
              <div style={{ 
                backgroundColor: warningColor,
                color: 'white',
                padding: '10px 15px',
                borderRadius: '4px',
                display: 'inline-block',
                fontSize: '16px'
              }}>
                {warningType.charAt(0).toUpperCase() + warningType.slice(1)} Warning
              </div>
              <p style={{ 
                fontSize: '14px',
                color: '#666',
                marginTop: '20px',
                borderTop: '1px solid #eee',
                paddingTop: '20px'
              }}>
                This is an automated alert from the ElderGuard system. Please check the ElderGuard dashboard for more details.
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div style={{ 
        textAlign: 'center',
        color: '#999',
        fontSize: '12px',
        padding: '10px'
      }}>
        &copy; {new Date().getFullYear()} ElderGuard. All rights reserved.
      </div>
    </div>
  );
};