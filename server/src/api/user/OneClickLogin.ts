import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';
import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';
import jwt from "jsonwebtoken";
import { getConfig } from '../../config';

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.categoryCreate, // or a specific impersonate permission
    );

    const { userId } = req.body;



        const payload = await UserRepository.findById(
          userId,
          req,
        );




    // 🔑 Generate a short-lived token for impersonation
    const token = jwt.sign(
          { id: payload.id },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
        );

    await ApiResponseHandler.success(req, res, { token });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
