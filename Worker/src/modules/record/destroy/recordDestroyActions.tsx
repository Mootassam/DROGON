import listActions from 'src/modules/record/list/recordListActions';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import RecordService from 'src/modules/record/recordService';

const prefix = 'RECORD_DESTROY';

const recordDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: recordDestroyActions.DESTROY_STARTED,
      });

      await RecordService.destroyAll([id]);

      dispatch({
        type: recordDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.record.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/record');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: recordDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: recordDestroyActions.DESTROY_ALL_STARTED,
      });

      await RecordService.destroyAll(ids);

      dispatch({
        type: recordDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.record.destroyAll.success'),
      );

      getHistory().push('/record');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: recordDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default recordDestroyActions;
