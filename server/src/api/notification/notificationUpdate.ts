import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import NotifServicess from "../../services/notifServices";

export default (io) => async (req, res, next) => {
  try {
    // new PermissionChecker(req).validateHas(
    //   Permissions.values.categoryRead,
    // );

    const payload = await new NotifServicess(req).update(req.params.id, io);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
