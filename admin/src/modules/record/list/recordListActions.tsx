import selectors from 'src/modules/record/list/recordListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/record/list/recordListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import RecordService from 'src/modules/record/recordService';

const prefix = 'RECORD_LIST';

const recordListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  COUNT_STARTED: `${prefix}_COUNT_STARTED`,
  COUNT_SUCCESS: `${prefix}_COUNT_SUCCESS`,
  COUNT_ERROR: `${prefix}_COUNT_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: recordListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: recordListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: recordListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: recordListActions.RESETED,
    });

    dispatch(recordListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: recordListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await RecordService.list(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.record.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: recordListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: recordListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: recordListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(recordListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: recordListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(recordListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        recordListActions.doFetch(filter, rawFilter, true),
      );
    },

    checkCurrentTask :() => async(dispatch , getState) => { 


    },

    doTasksDone: (id) => async (dispatch) => {
      try {
        dispatch({
          type: recordListActions.COUNT_STARTED,
        });
        const response = await RecordService.TasksDone(id);
  
        dispatch({
          type: recordListActions.COUNT_SUCCESS,
          payload: {
            count: response,
          },
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: recordListActions.COUNT_ERROR,
        });
      }
    },

  

  

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: recordListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await RecordService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: recordListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: recordListActions.FETCH_ERROR,
        });
      }
    },
};

export default recordListActions;
