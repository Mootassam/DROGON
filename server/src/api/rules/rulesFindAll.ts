import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import RulesService from '../../services/rulesService';

export default async (req, res, next) => {
  try {

    const payload = await new RulesService(req).findAll();
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
