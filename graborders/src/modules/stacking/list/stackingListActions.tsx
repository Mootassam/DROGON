import stackingService from 'src/modules/stacking/stackingService';
import selectors from 'src/modules/stacking/list/stackingListSelectors';
import { i18n } from '../../../i18n';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'STACKING_LIST';

const stackingListActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

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
      type: stackingListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: stackingListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: stackingListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: stackingListActions.RESETED,
    });

    dispatch(stackingListActions.doFetch());
  },

 

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: stackingListActions.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(stackingListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: stackingListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(stackingListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        stackingListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: stackingListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });
        const response = await stackingService.list(
          filter,
          selectors.selectOrderBy(getState()),
          100,
          selectors.selectOffset(getState()),
        );

   
        dispatch({
          type: stackingListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: stackingListActions.FETCH_ERROR,
        });
      }
    },
};

export default stackingListActions;
