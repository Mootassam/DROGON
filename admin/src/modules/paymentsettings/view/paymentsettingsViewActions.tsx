import PaymentsettingsService from 'src/modules/paymentsettings/paymentsettingsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAYMENTSETTINGS_VIEW';

const paymentsettingsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentsettingsViewActions.FIND_STARTED,
      });

      const record = await PaymentsettingsService.find(id);

      dispatch({
        type: paymentsettingsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentsettingsViewActions.FIND_ERROR,
      });

      getHistory().push('/paymentsettings');
    }
  },
};

export default paymentsettingsViewActions;
