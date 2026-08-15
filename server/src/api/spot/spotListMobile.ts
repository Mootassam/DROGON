import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import SpotServices from '../../services/spotServices';


export default async (req, res, next) => {
  try {
    // new PermissionChecker(req).validateHas(Permissions.values.categoryRead);  
    const payload = await new SpotServices(req).findAndCountAllMobile(req.query);
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
