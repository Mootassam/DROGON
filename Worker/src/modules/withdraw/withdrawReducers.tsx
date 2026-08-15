import list from 'src/modules/withdraw/list/withdrawListReducers';
import form from 'src/modules/withdraw/form/withdrawFormReducers';
import view from 'src/modules/withdraw/view/withdrawViewReducers';
import destroy from 'src/modules/withdraw/destroy/withdrawDestroyReducers';
import importerReducer from 'src/modules/withdraw/importer/withdrawImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
