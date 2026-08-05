import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.EMAIL_FROM || 'FrancPrep Academy <noreply@francprep.com>';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  /**
   * Generic sender with Resend or Console Fallback
   */
  async sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
    try {
      if (resend) {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to,
          subject,
          html,
          text: text || 'Please view this email in an HTML-compatible client.',
        });
        if (error) {
          console.error('[EmailService] Resend API Error:', error);
          return false;
        }
        console.log('[EmailService] Email sent successfully via Resend:', data?.id);
        return true;
      } else {
        console.log('\n==================================================');
        console.log('📧 [DEV EMAIL PREVIEW]');
        console.log(`TO: ${to}`);
        console.log(`SUBJECT: ${subject}`);
        console.log('--------------------------------------------------');
        console.log(text || 'HTML Content generated (set RESEND_API_KEY in .env for live delivery)');
        console.log('==================================================\n');
        return true;
      }
    } catch (err) {
      console.error('[EmailService] Delivery failed:', err);
      return false;
    }
  }

  /**
   * 🔐 Send 6-Digit Email Verification OTP Code
   */
  async sendVerificationEmail(to: string, firstName: string, code: string, langCode = 'fr'): Promise<boolean> {
    const brandName = langCode === 'de' ? 'GermanPrep' : langCode === 'es' ? 'SpanPrep' : langCode === 'it' ? 'ItalPrep' : 'FrancPrep';
    const flag = langCode === 'de' ? '🇩🇪' : langCode === 'es' ? '🇪🇸' : langCode === 'it' ? '🇮🇹' : '🇫🇷';
    
    const subject = `${flag} ${code} is your ${brandName} verification code`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin:0; padding:0; background-color:#070B17; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#070B17; padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:560px; background-color:#101828; border:1px solid #1e2a4a; border-radius:24px; padding:40px 30px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block; width:56px; height:56px; line-height:56px; background:linear-gradient(135deg, #a855f7, #ec4899); border-radius:16px; font-size:28px; text-align:center;">
                      ${flag}
                    </div>
                    <h1 style="margin:16px 0 4px 0; font-size:24px; font-weight:800; color:#ffffff; tracking-tight:${brandName};">${brandName} Academy</h1>
                    <p style="margin:0; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#a855f7;">Email Verification</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding-bottom:24px; text-align:center;">
                    <h2 style="margin:0 0 12px 0; font-size:20px; font-weight:700; color:#ffffff;">Welcome, ${firstName}! 👋</h2>
                    <p style="margin:0 0 24px 0; font-size:14px; line-height:1.6; color:#94a3b8;">
                      Thank you for joining ${brandName}. Please use the 6-digit verification code below to activate your learning account:
                    </p>
                    
                    <!-- Code Box -->
                    <div style="background-color:#070B17; border:2px dashed #a855f7; border-radius:16px; padding:20px; display:inline-block; margin:0 auto 24px auto;">
                      <span style="font-family:'Courier New', Courier, monospace; font-size:36px; font-weight:900; letter-spacing:8px; color:#c084fc;">${code}</span>
                    </div>

                    <p style="margin:0; font-size:12px; color:#64748b;">
                      This code is valid for <strong>15 minutes</strong>. If you did not create an account, please ignore this email.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="border-top:1px solid #1e2a4a; padding-top:20px; text-align:center; font-size:12px; color:#64748b;">
                    © ${new Date().getFullYear()} ${brandName} Academy • Official CEFR Language Learning Platform
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject,
      html,
      text: `Welcome ${firstName}! Your ${brandName} verification code is: ${code}. Valid for 15 minutes.`,
    });
  }

  /**
   * 🔑 Send Password Reset Token Email
   */
  async sendPasswordResetEmail(to: string, firstName: string, resetToken: string, langCode = 'fr'): Promise<boolean> {
    const brandName = langCode === 'de' ? 'GermanPrep' : langCode === 'es' ? 'SpanPrep' : langCode === 'it' ? 'ItalPrep' : 'FrancPrep';
    const baseUrl = process.env.FRONTEND_URL || 'https://francprep.vercel.app';
    const resetUrl = `${baseUrl}/login?resetToken=${resetToken}&email=${encodeURIComponent(to)}`;

    const subject = `🔒 Reset your ${brandName} password`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Password</title>
      </head>
      <body style="margin:0; padding:0; background-color:#070B17; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#070B17; padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:560px; background-color:#101828; border:1px solid #1e2a4a; border-radius:24px; padding:40px 30px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <h1 style="margin:0; font-size:24px; font-weight:800; color:#ffffff;">${brandName} Security</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:24px; text-align:center;">
                    <h2 style="margin:0 0 12px 0; font-size:18px; font-weight:700; color:#ffffff;">Hello ${firstName},</h2>
                    <p style="margin:0 0 24px 0; font-size:14px; line-height:1.6; color:#94a3b8;">
                      We received a request to reset your password. Click the button below to choose a new password:
                    </p>
                    
                    <a href="${resetUrl}" style="display:inline-block; background:linear-gradient(135deg, #a855f7, #ec4899); color:#ffffff; text-decoration:none; font-size:14px; font-weight:800; padding:14px 28px; border-radius:12px; box-shadow:0 10px 20px rgba(168,85,247,0.3);">
                      Reset Password →
                    </a>

                    <p style="margin:24px 0 0 0; font-size:12px; color:#64748b;">
                      Link expires in 60 minutes. If you did not request a password reset, your account is secure and no action is required.
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

    return this.sendEmail({
      to,
      subject,
      html,
      text: `Hello ${firstName}, click the link below to reset your ${brandName} password:\n${resetUrl}`,
    });
  }
}

export const emailService = new EmailService();
