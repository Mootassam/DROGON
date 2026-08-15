import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import vipService from 'src/modules/vip/vipService';

const prefix = 'COUPONS_VIEW';

const vipViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vipViewActions.FIND_STARTED,
      });
      const record = await vipService.find(id);
      dispatch({
        type: vipViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vipViewActions.FIND_ERROR,
      });

      getHistory().push('/vip');
    }
  },
};

export default vipViewActions;
