import list from 'src/modules/stacking/list/stackingListReducers';
import form from 'src/modules/stacking/form/stackingFormReducers';
import view from 'src/modules/stacking/view/stackingViewReducers';
import destroy from 'src/modules/stacking/destroy/stackingDestroyReducers';
import importerReducer from 'src/modules/stacking/importer/stackingImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
