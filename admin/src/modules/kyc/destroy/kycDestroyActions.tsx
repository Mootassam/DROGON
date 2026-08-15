import listActions from 'src/modules/kyc/list/kycListActions';
import KycService from 'src/modules/kyc/kycService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'COUPONS_DESTROY';

const vipDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vipDestroyActions.DESTROY_STARTED,
      });

      await KycService.destroyAll([id]);

      dispatch({
        type: vipDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.kyc.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/kyc');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vipDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: vipDestroyActions.DESTROY_ALL_STARTED,
      });

      await KycService.destroyAll(ids);

      dispatch({
        type: vipDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.kyc.destroyAll.success'),
      );

      getHistory().push('/kyc');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vipDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default vipDestroyActions;
