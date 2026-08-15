import listActions from 'src/modules/rules/list/rulesListActions';
import RulesService from 'src/modules/rules/rulesService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'Rules_DESTROY';

const rulesDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: rulesDestroyActions.DESTROY_STARTED,
      });

      await RulesService.destroyAll([id]);

      dispatch({
        type: rulesDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.rules.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/rules');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: rulesDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: rulesDestroyActions.DESTROY_ALL_STARTED,
      });

      await RulesService.destroyAll(ids);

      dispatch({
        type: rulesDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.rules.destroyAll.success'),
      );

      getHistory().push('/rules');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: rulesDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default rulesDestroyActions;
