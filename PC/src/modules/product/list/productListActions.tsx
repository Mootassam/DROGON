import Errors from 'src/modules/shared/error/errors';
import ProductService from 'src/modules/product/productService';
import UserService from 'src/modules/user/userService';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'PRODUCT_LIST';

const productListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  NEWS_STARTED: `${prefix}_NEWS_STARTED`,
  NEWS_SUCCESS: `${prefix}_NEWS_SUCCESS`,
  NEWS_ERROR: `${prefix}_NEWS_ERROR`,


  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,




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
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: productListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });
          const response = await ProductService.list();

          dispatch({
            type: productListActions.FETCH_SUCCESS,
            payload: response
          });

        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: productListActions.FETCH_ERROR,
          });
        }
      },



  doFindById:
    (id) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: productListActions.FIND_STARTED,
          });
          const response = await ProductService.find(id);

          dispatch({
            type: productListActions.FIND_SUCCESS,
            payload: response
          });

        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: productListActions.FIND_ERROR,
          });
        }
      },

  doFindTenants: (data, next) => {
    return async (dispatch, getState) => {
      try {
        // ✅ Check if tenant already exists in memory/local storage
        const existingTenant = AuthCurrentTenant.get();

        if (existingTenant) {
          // No need to fetch again
          if (next) next(existingTenant);
          return;
        }

        // ✅ Fetch tenant only if not found
        const tenant = await UserService.getSingle();

        if (tenant) {
          AuthCurrentTenant.set(tenant);
          if (next) next(tenant);
        } else {
          throw new Error("Tenant not found");
        }

      } catch (error) {
        Errors.handle(error);
      }
    };
  },


  doFindNews:
    (data, next?) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: productListActions.NEWS_STARTED,
          });
          const response = await ProductService.findNews(data);

          dispatch({
            type: productListActions.NEWS_SUCCESS,
            payload: response
          });

        } catch (error) {
          Errors.handle(error);
          dispatch({
            type: productListActions.NEWS_ERROR,
          });
        }
      },
};

export default productListActions;
