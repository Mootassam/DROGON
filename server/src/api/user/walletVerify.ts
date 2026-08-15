import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';
import Permissions from '../../security/permissions';
import AuthService from '../../services/auth/authService';

export default async (req, res) => {
  try {
  
    const payload = await AuthService.signWithWallet(
     req, 
     req
    );
    
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
