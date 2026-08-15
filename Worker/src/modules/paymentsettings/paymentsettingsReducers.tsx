import list from 'src/modules/paymentsettings/list/paymentsettingsListReducers';
import form from 'src/modules/paymentsettings/form/paymentsettingsFormReducers';
import view from 'src/modules/paymentsettings/view/paymentsettingsViewReducers';
import destroy from 'src/modules/paymentsettings/destroy/paymentsettingsDestroyReducers';
import importerReducer from 'src/modules/paymentsettings/importer/paymentsettingsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
