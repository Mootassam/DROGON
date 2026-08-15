import list from 'src/modules/coupons/list/couponsListReducers';
import form from 'src/modules/coupons/form/couponsFormReducers';
import view from 'src/modules/coupons/view/couponsViewReducers';
import destroy from 'src/modules/coupons/destroy/couponsDestroyReducers';
import importerReducer from 'src/modules/coupons/importer/couponsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
