import depositService from 'src/modules/assets/assetsService';
import selectors from 'src/modules/assets/list/assetsListSelectors';
import Errors from 'src/modules/shared/error/errors';


const prefix = 'ASSESTS_LIST';

const assetsListActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,



  CONVERT_STARTED: `${prefix}_CONVERT_STARTED`,
  CONVERT_SUCCESS: `${prefix}_CONVERT_SUCCESS`,
  CONVERT_ERROR: `${prefix}_CONVERT_ERROR`,


  FETCH_TRANSFER_STARTED: `${prefix}_FETCH_TRANSFER_STARTED`,
  FETCH_TRANSFER_SUCCESS: `${prefix}_FETCH_TRANSFER_SUCCESS`,
  FETCH_TRANSFER_ERROR: `${prefix}_FETCH_TRANSFER_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  SELECT_FIAT: `${prefix}_SELECT_FIAT`,


  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: assetsListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: assetsListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: assetsListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: assetsListActions.RESETED,
    });

    dispatch(assetsListActions.doFetch());
  },



  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: assetsListActions.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(assetsListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: assetsListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(assetsListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        assetsListActions.doFetch(filter, rawFilter),
      );
    },

SelectFiat: (fiatCode) => ({
  type: assetsListActions.SELECT_FIAT,
  payload: fiatCode,
}),

  doFetch:
    (filter?, fiat = 'USD') =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: assetsListActions.FETCH_STARTED,
            payload: { filter, fiat },
          });
          const response = await depositService.list(
            filter,
            fiat
          );
          dispatch({
            type: assetsListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
              totalFiat: response.totalFiat,
              selectedFiat: fiat,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: assetsListActions.FETCH_ERROR,
          });
        }
      },



  doConvert:
    (fiat) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: assetsListActions.CONVERT_STARTED
          });
          const response = await depositService.Convert
            (fiat);
          dispatch({
            type: assetsListActions.CONVERT_SUCCESS,
            payload: response
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: assetsListActions.CONVERT_ERROR,
          });
        }
      },

  TransferList:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: assetsListActions.FETCH_TRANSFER_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await depositService.transferList(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );
          dispatch({
            type: assetsListActions.FETCH_TRANSFER_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: assetsListActions.FETCH_TRANSFER_ERROR,
          });
        }
      },
};

export default assetsListActions;
