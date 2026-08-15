import RulesService from 'src/modules/rules/rulesService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'RULESVIEW';

const rulesViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: rulesViewActions.FIND_STARTED,
      });

      const record = await RulesService.find(id);

      dispatch({
        type: rulesViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rulesViewActions.FIND_ERROR,
      });
      getHistory().push('/rules');
    }
  },
};

export default rulesViewActions;
