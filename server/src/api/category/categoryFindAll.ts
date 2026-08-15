import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import CompanyService from "../../services/companyService";

export default async (req, res, next) => {
  try {

    const payload = await new CompanyService(req).findAll();
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
