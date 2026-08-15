import list from 'src/modules/rules/list/rulesListReducers';
import form from 'src/modules/rules/form/rulesFormReducers';
import view from 'src/modules/rules/view/rulesViewReducers';
import destroy from 'src/modules/rules/destroy/rulesDestroyReducers';
import importerReducer from 'src/modules/rules/importer/rulesImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
