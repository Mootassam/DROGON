import Errors from "src/modules/shared/error/errors";
import Message from "src/view/shared/message";
import { getHistory } from "src/modules/store";
import { i18n } from "../../../i18n";
import notificationService from "../notificationService";
import notificationListActions from "../list/notificationListActions";

const prefix = "COUPONS_FORM";

const notificationFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await notificationService.find(id);
      }

      dispatch({
        type: notificationFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.INIT_ERROR,
      });

      getHistory().push("/deposit");
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.CREATE_STARTED,
      });

      await notificationService.create(values);

      dispatch({
        type: notificationFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n("entities.deposit.create.success"));

      getHistory().push("/deposit");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: notificationFormActions.UPDATE_STARTED,
      });

      await notificationService.update(id);

      dispatch({
        type: notificationFormActions.UPDATE_SUCCESS,
      });

      // Message.success(i18n("entities.deposit.update.success"));
      dispatch(notificationListActions.doFetch());

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default notificationFormActions;
