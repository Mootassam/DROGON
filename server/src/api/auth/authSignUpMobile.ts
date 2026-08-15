import ApiResponseHandler from "../apiResponseHandler";
import AuthService from "../../services/auth/authService";
import { otpStore } from "./otpStore";

export default async (req, res, next) => {
  try {
    // Require a verified email OTP before creating the account
    const email = String(req.body?.email || '').trim();
    if (!otpStore.isVerified(email)) {
      return res.status(400).json({
        errors: [{ message: 'Please verify your email with the code we sent before signing up.' }],
      });
    }

    const payload = await AuthService.signupMobile(
      req.body.email,
      req.body.password,
      req.body.phoneNumber,
      req.body.invitationToken,
      req.body.tenantId,
      req,
      req
    );

    otpStore.delete(email); // consume the code once the account is created
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
