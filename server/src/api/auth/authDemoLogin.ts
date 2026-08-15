import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';
import Error400 from '../../errors/Error400';

export default async (req, res, next) => {
  try {
    // For demo login, we require tenantId from body
    const tenantId = req.body.tenantId;

    if (!tenantId) {
      throw new Error400(req.language, "errors.tenantRequired");
    }

    const payload = await AuthService.signupDemo(
      tenantId,
      req, // options (contains database, language)
      req  // request object
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
