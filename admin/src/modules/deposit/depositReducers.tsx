import list from 'src/modules/deposit/list/depositListReducers';
import form from 'src/modules/deposit/form/depositFormReducers';
import view from 'src/modules/deposit/view/depositViewReducers';
import destroy from 'src/modules/deposit/destroy/depositDestroyReducers';
import importerReducer from 'src/modules/deposit/importer/depositImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
