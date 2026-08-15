import listActions from 'src/modules/transaction/list/transactionListActions';
import CouponsService from 'src/modules/transaction/transactionService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import TransactionService from 'src/modules/transaction/transactionService';

const prefix = 'TRANSACTION_DESTROY';
const transactionDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: transactionDestroyActions.DESTROY_STARTED,
      });

      await TransactionService.destroyAll([id]);

      dispatch({
        type: transactionDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.transaction.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/transaction');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: transactionDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: transactionDestroyActions.DESTROY_ALL_STARTED,
      });

      await CouponsService.destroyAll(ids);

      dispatch({
        type: transactionDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.transaction.destroyAll.success'),
      );

      getHistory().push('/transaction');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: transactionDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default transactionDestroyActions;
