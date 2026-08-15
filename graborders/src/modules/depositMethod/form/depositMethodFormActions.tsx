
import DepositMethod from 'src/modules/depositMethod/depositMethodService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from '../../../i18n';

const prefix = 'DEPOSITMETHOD_FORM';

const DepopsitFormActions = {
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
        type: DepopsitFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await DepositMethod.find(id);
      }

      dispatch({
        type: DepopsitFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: DepopsitFormActions.INIT_ERROR,
      });

      getHistory().push('/stacking');
    }
  },

  doCreate: () => async (dispatch) => {
    try {
      dispatch({
        type: DepopsitFormActions.CREATE_STARTED,
      });

      await DepositMethod.create();

      dispatch({
        type: DepopsitFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vip.create.success'),
      );

      getHistory().push('/depositMethod');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: DepopsitFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DepopsitFormActions.UPDATE_STARTED,
      });

      await DepositMethod.update(id, values);

      dispatch({
        type: DepopsitFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vip.update.success'),
      );

      getHistory().push('/stackingPlan');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: DepopsitFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default DepopsitFormActions;
