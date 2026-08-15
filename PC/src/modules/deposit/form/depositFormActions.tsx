import vipService from 'src/modules/deposit/depositService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from '../../../i18n';


const prefix = 'DEPOSIT_FORM';

const vipFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

 CLEAR_SUCCESS: `${prefix}_CLEAR_SUCCESS`,

  

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

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

      getHistory().push('/deposit');
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
      getHistory().push('/deposit');

            Message.success(i18n("entities.deposit.create.success"));
      

    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: vipFormActions.CREATE_ERROR,
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



  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: vipFormActions.UPDATE_STARTED,
      });

      await vipService.update(id, values);

      dispatch({
        type: vipFormActions.UPDATE_SUCCESS,
      });


      getHistory().push('/deposit');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vipFormActions.UPDATE_ERROR,
      });
    }
  },


   
};

export default vipFormActions;
