import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import RecordServices from "../../services/recordServices";

export default async (req, res, next) => {
  try {


    const userId = req.params.id
    // new PermissionChecker(req).validateHas(Permissions.values.categoryRead);   
    const payload = await new RecordServices(req).countTasksDone(userId);
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
