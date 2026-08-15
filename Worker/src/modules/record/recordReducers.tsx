import list from 'src/modules/record/list/recordListReducers';
import form from 'src/modules/record/form/recordFormReducers';
import view from 'src/modules/record/view/recordViewReducers';
import destroy from 'src/modules/record/destroy/recordDestroyReducers';
import importerReducer from 'src/modules/record/importer/recordImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
