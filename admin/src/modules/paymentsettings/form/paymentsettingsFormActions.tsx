import PaymentsettingsService from 'src/modules/paymentsettings/paymentsettingsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAYMENTSETTINGS_FORM';

const paymentsettingsFormActions = {
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
        type: paymentsettingsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PaymentsettingsService.find(id);
      }

      dispatch({
        type: paymentsettingsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentsettingsFormActions.INIT_ERROR,
      });

      getHistory().push('/paymentsettings');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: paymentsettingsFormActions.CREATE_STARTED,
      });

      await PaymentsettingsService.create(values);

      dispatch({
        type: paymentsettingsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.paymentsettings.create.success'),
      );

      getHistory().push('/paymentsettings');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentsettingsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: paymentsettingsFormActions.UPDATE_STARTED,
      });

      await PaymentsettingsService.update(id, values);

      dispatch({
        type: paymentsettingsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.paymentsettings.update.success'),
      );

      getHistory().push('/paymentsettings');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentsettingsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default paymentsettingsFormActions;
