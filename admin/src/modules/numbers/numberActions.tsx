import service from 'src/modules/numbers/numberService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
const prefix = 'NUMBER';
const numberActions = {
  NUMBER_START: `${prefix}_START`,
  NUMBER_SUCCESS: `${prefix}_SUCCESS`,
  NUMBER_ERROR: `${prefix}_ERROR`,

  RESET__START: `${prefix}__START`,
  RESET__SUCCESS: `${prefix}__SUCCESS`,
  RESET__ERROR: `${prefix}__ERROR`,

  doUploadFile: (file) => async (dispatch) => {
    try {
      dispatch({ type: numberActions.NUMBER_START });
      const formData = new FormData();
      formData.append('file', file);
      const payload = await service.UploadFile(formData);
      dispatch({
        type: numberActions.NUMBER_SUCCESS,
        payload,
      });
      Message.success('Operation completed');
    } catch (error) {
      if (Errors.errorCode(error) !== 400) {
        Errors.handle(error);
      }
      dispatch({
        type: numberActions.NUMBER_ERROR,
        payload: Errors.selectMessage(error),
      });
      Message.error(Errors.selectMessage(error));
    }
  },

  doClearfile: () => async (dispatch) => {
    dispatch({ type: numberActions.RESET__START });
  },
};

export default numberActions;
