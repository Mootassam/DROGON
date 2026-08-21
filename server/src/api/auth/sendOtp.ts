import ApiResponseHandler from '../apiResponseHandler';
import axios from 'axios';
import { otpStore } from './otpStore';

// Resend email service (https://resend.com)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.OTP_FROM_EMAIL || 'noreply@granndcapital.com';
const BRAND = 'Granndcapital';

export default async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ errors: [{ message: 'A valid email address is required' }] });
    }

    // Generate a 6-digit code and store it (5-minute expiry)
    const code = String(Math.floor(100000 + Math.random() * 900000));
    otpStore.set(email, code);

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="color:#0064FA;margin:0 0 8px;">${BRAND} Email Verification</h2>
        <p style="color:#444;font-size:14px;">Use the code below to verify your email address and complete your registration.</p>
        <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:#111;background:#f3f6ff;border:1px solid #dbe7ff;border-radius:12px;padding:18px;text-align:center;margin:18px 0;">
          ${code}
        </div>
        <p style="color:#888;font-size:13px;">This code expires in 5 minutes. If you didn't request it, you can safely ignore this email.</p>
        <p style="color:#aaa;font-size:12px;margin-top:24px;">© ${BRAND}</p>
      </div>`;

    await axios.post(
      'https://api.resend.com/emails',
      {
        from: `${BRAND} <${FROM_EMAIL}>`,
        to: [email],
        subject: `Your ${BRAND} verification code: ${code}`,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    await ApiResponseHandler.success(req, res, { sent: true });
  } catch (error: any) {
    // Log the underlying Resend error for debugging, return a clean message
    console.error('send-otp error:', error?.response?.data || error?.message || error);
    return res.status(502).json({ errors: [{ message: 'Failed to send verification email. Please try again.' }] });
  }
};
