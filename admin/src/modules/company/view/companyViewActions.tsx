import CompanyService from 'src/modules/company/companyService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'COMPANY_VIEW';

const CompanyViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: CompanyViewActions.FIND_STARTED,
      });

      const record = await CompanyService.find(id);

      dispatch({
        type: CompanyViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: CompanyViewActions.FIND_ERROR,
      });

      getHistory().push('/company');
    }
  },
};

export default CompanyViewActions;
