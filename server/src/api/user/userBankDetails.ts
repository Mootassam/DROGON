import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';
import Permissions from '../../security/permissions';

export default async (req, res) => {
  try {


    const payload = await UserRepository.updateMyBankInfo(
      req.body,
      req
    );


    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
