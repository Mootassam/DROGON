import futuresService from 'src/modules/futures/futuresService';
import selectors from 'src/modules/futures/list/futuresListSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'FUTURES_LIST';

const futuresListActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  PENDING_FETCH_STARTED: `${prefix}_PENDING_FETCH_STARTED`,
  PENDING_FETCH_SUCCESS: `${prefix}_PENDING_FETCH_SUCCESS`,
  PENDING_FETCH_ERROR: `${prefix}_PENDING_FETCH_ERROR`,


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
      type: futuresListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: futuresListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: futuresListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: futuresListActions.RESETED,
    });

    dispatch(futuresListActions.doFetch());
  },



  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: futuresListActions.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(futuresListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: futuresListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(futuresListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        futuresListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: futuresListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await futuresService.list(
            `${true}`,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );
          dispatch({
            type: futuresListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: futuresListActions.FETCH_ERROR,
          });
        }
      },

  doFetchPending:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: futuresListActions.PENDING_FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await futuresService.list(
            `${false}`,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );
          dispatch({
            type: futuresListActions.PENDING_FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: futuresListActions.PENDING_FETCH_ERROR,
          });
        }
      },




};

export default futuresListActions;
