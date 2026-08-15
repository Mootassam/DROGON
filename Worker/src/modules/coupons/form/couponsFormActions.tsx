import CouponsService from 'src/modules/coupons/couponsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'COUPONS_FORM';

const couponsFormActions = {
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
        type: couponsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await CouponsService.find(id);
      }

      dispatch({
        type: couponsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: couponsFormActions.INIT_ERROR,
      });

      getHistory().push('/coupons');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: couponsFormActions.CREATE_STARTED,
      });

      await CouponsService.create(values);

      dispatch({
        type: couponsFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.coupons.create.success'),
      );

      getHistory().push('/coupons');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: couponsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: couponsFormActions.UPDATE_STARTED,
      });

      await CouponsService.update(id, values);

      dispatch({
        type: couponsFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.coupons.update.success'),
      );

      getHistory().push('/coupons');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: couponsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default couponsFormActions;
