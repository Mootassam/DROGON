import stackingService from 'src/modules/stackingPlan/stackingPlanService';
import selectors from 'src/modules/stacking/list/stackingListSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'PLAN_LIST';

const stackingPlanAction = {

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
      type: stackingPlanAction.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: stackingPlanAction.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: stackingPlanAction.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: stackingPlanAction.RESETED,
    });

    dispatch(stackingPlanAction.doFetch());
  },

 

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: stackingPlanAction.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(stackingPlanAction.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: stackingPlanAction.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(stackingPlanAction.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        stackingPlanAction.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: stackingPlanAction.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });
        const response = await stackingService.list(
          filter,
          selectors.selectOrderBy(getState()),
          100,
          selectors.selectOffset(getState()),
        );


        dispatch({
          type: stackingPlanAction.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: stackingPlanAction.FETCH_ERROR,
        });
      }
    },
};

export default stackingPlanAction;
