import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import DepositNetworkServices from "../../services/depositNetworkServices";

export default async (req, res, next) => {
  try {
    // new PermissionChecker(req).validateHas(Permissions.values.categoryRead);
    const payload = await new DepositNetworkServices(req).findAndCountAll(req.query);
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
