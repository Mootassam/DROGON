import listActions from 'src/modules/transaction/list/transactionListActions';
import vipService from 'src/modules/vip/vipService';
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

      await vipService.destroyAll([id]);

      dispatch({
        type: vipDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.vip.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/vip');
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

      await vipService.destroyAll(ids);

      dispatch({
        type: vipDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.vip.destroyAll.success'),
      );

      getHistory().push('/vip');
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
