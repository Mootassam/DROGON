import listActions from 'src/modules/coupons/list/couponsListActions';
import CouponsService from 'src/modules/coupons/couponsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'COUPONS_DESTROY';

const couponsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: couponsDestroyActions.DESTROY_STARTED,
      });

      await CouponsService.destroyAll([id]);

      dispatch({
        type: couponsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.coupons.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/coupons');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: couponsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: couponsDestroyActions.DESTROY_ALL_STARTED,
      });

      await CouponsService.destroyAll(ids);

      dispatch({
        type: couponsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.coupons.destroyAll.success'),
      );

      getHistory().push('/coupons');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: couponsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default couponsDestroyActions;
