
import vipService from 'src/modules/stacking/stackingService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from '../../../i18n';
import listActions from 'src/modules/stacking/list/stackingListActions';
import assetsListActions from 'src/modules/assets/list/assetsListActions'
const prefix = 'COUPONS_FORM';

const vipFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,



  CLEAR_SUCCESS: `${prefix}_CLEAR_SUCCESS`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vipFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await vipService.find(id);
      }

      dispatch({
        type: vipFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vipFormActions.INIT_ERROR,
      });

      getHistory().push('/stacking');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vipFormActions.CREATE_STARTED,
      });

      await vipService.create(values);

      dispatch({
        type: vipFormActions.CREATE_SUCCESS,
      });


      dispatch(listActions.doFetchCurrentFilter());
      dispatch(assetsListActions.doFetch())
      getHistory().push('/stacking');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vipFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: vipFormActions.UPDATE_STARTED,
      });

      await vipService.update(id, values);

      dispatch({
        type: vipFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.stacking.update.success'),
      );

      getHistory().push('/stacking');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vipFormActions.UPDATE_ERROR,
      });
    }

  },


  doClose: () => async (dispatch) => {
    try {

      dispatch({
        type: vipFormActions.CLEAR_SUCCESS,
      });

    } catch (error) {
      Errors.handle(error);
    }
  },
};

export default vipFormActions;
