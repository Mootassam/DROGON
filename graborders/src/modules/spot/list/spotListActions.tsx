import spotService from 'src/modules/spot/spotService';
import selectors from 'src/modules/spot/list/spotListSelectors';
import { i18n } from '../../../i18n';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'SPOT_LIST';

const spotListActions = {

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
      type: spotListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: spotListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: spotListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: spotListActions.RESETED,
    });

    dispatch(spotListActions.doFetch());
  },


  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: spotListActions.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(spotListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: spotListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(spotListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        spotListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetchPending:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: spotListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await spotService.list(

            "pending"
            ,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );
          dispatch({
            type: spotListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: spotListActions.FETCH_ERROR,
          });
        }
      },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: spotListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await spotService.list(
filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );
          dispatch({
            type: spotListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: spotListActions.FETCH_ERROR,
          });
        }
      },
};

export default spotListActions;
