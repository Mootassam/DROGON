import listActions from 'src/modules/paymentsettings/list/paymentsettingsListActions';
import PaymentsettingsService from 'src/modules/paymentsettings/paymentsettingsService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PAYMENTSETTINGS_DESTROY';

const paymentsettingsDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_STARTED,
      });

      await PaymentsettingsService.destroyAll([id]);

      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.paymentsettings.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/paymentsettings');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_ALL_STARTED,
      });

      await PaymentsettingsService.destroyAll(ids);

      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.paymentsettings.destroyAll.success'),
      );

      getHistory().push('/paymentsettings');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentsettingsDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default paymentsettingsDestroyActions;
