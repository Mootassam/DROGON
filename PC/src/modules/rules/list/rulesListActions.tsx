import RulesService from 'src/modules/rules/rulesService';
import selectors from 'src/modules/rules/list/rulesListSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'RULES_LIST';

const rulesListActions = {
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

  

  doReset: () => async (dispatch) => {
    dispatch({
      type: rulesListActions.RESETED,
    });

    dispatch(rulesListActions.doFetch());
  },



  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: rulesListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(rulesListActions.doFetchCurrentFilter());
  },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: rulesListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(rulesListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(rulesListActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => {
    return async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: rulesListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await RulesService.list(
        filter,
        selectors.selectOrderBy(getState()),
        selectors.selectLimit(getState()),
        selectors.selectOffset(getState()),
      );


      dispatch({
        type: rulesListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });

      
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: rulesListActions.FETCH_ERROR,
      });
    }
  };
  },
};

export default rulesListActions;
