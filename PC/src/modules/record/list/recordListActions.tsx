import selectors from "src/modules/record/list/recordListSelectors";
import Errors from "src/modules/shared/error/errors";
import RecordService from "src/modules/record/recordService";

const prefix = "RECORD_LIST";

const recordListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  CHECK_STARTED: `${prefix}_CHECK_STARTED`,
  CHECK_SUCCESS: `${prefix}_CHECK_SUCCESS`,
  CHECK_ERROR: `${prefix}_CHECK_ERROR`,

  COUNT_STARTED: `${prefix}_COUNT_STARTED`,
  COUNT_SUCCESS: `${prefix}_COUNT_SUCCESS`,
  COUNT_ERROR: `${prefix}_COUNT_ERROR`,

  COUNTDAY_STARTED: `${prefix}_COUNTDAY_STARTED`,
  COUNTDAY_SUCCESS: `${prefix}_COUNTDAY_SUCCESS`,
  COUNTDAY_ERROR: `${prefix}_COUNTDAY_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doFetch:
    (filter?, rawFilter?, limit?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: recordListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await RecordService.list(
          filter,
          selectors.selectOrderBy(getState()),
          limit,
          selectors.selectOffset(getState())
        );

        dispatch({
          type: recordListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
            total: response.total,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: recordListActions.FETCH_ERROR,
        });
      }
    },

  doCount: () => async (dispatch) => {
    try {
      dispatch({
        type: recordListActions.COUNT_STARTED,
      });
      const response = await RecordService.count();

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

  doCountDay: () => async (dispatch) => {
    try {
      dispatch({
        type: recordListActions.COUNTDAY_STARTED,
      });
      const response = await RecordService.countDay();

      dispatch({
        type: recordListActions.COUNTDAY_SUCCESS,
        payload: {
          count: response,
        },
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: recordListActions.COUNTDAY_ERROR,
      });
    }
  },

  doCheck: () => async (dispatch) => {
    try {
      dispatch({
        type: recordListActions.CHECK_STARTED,
      });
      await RecordService.check();
      dispatch({
        type: recordListActions.CHECK_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: recordListActions.CHECK_ERROR,
        // payload: error?.response?.data,
        payload: error,
      });
    }
  },
};

export default recordListActions;
