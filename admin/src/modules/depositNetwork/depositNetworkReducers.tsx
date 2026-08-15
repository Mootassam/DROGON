import list from 'src/modules/depositNetwork/list/depositNetworkListReducers';
import form from 'src/modules/depositNetwork/form/depositNetworkFormReducers';
import view from 'src/modules/depositNetwork/view/depositNetworkViewReducers';
import destroy from 'src/modules/depositNetwork/destroy/depositNetworkDestroyReducers';
import importerReducer from 'src/modules/depositNetwork/importer/depositNetworkImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
