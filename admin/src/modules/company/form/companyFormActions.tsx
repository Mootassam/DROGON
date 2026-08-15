import CompanyService from 'src/modules/company/companyService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'COMPANY_FORM';

const CompanyFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: CompanyFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await CompanyService.find(id);
      }

      dispatch({
        type: CompanyFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: CompanyFormActions.INIT_ERROR,
      });

      getHistory().push('/company');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: CompanyFormActions.CREATE_STARTED,
      });

      await CompanyService.create(values);

      dispatch({
        type: CompanyFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.category.create.success'),
      );

     
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: CompanyFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CompanyFormActions.UPDATE_STARTED,
      });

      await CompanyService.update(id, values);

      dispatch({
        type: CompanyFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.category.update.success'),
      );

      getHistory().push('/company');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: CompanyFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default CompanyFormActions;
