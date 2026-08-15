import list from 'src/modules/kyc/list/kycListReducers';
import form from 'src/modules/kyc/form/kycFormReducers';
import view from 'src/modules/kyc/view/kycViewReducers';
import destroy from 'src/modules/kyc/destroy/kycDestroyReducers';
import importerReducer from 'src/modules/kyc/importer/kycImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
