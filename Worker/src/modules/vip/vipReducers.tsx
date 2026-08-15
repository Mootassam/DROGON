import list from 'src/modules/vip/list/vipListReducers';
import form from 'src/modules/vip/form/vipFormReducers';
import view from 'src/modules/vip/view/vipViewReducers';
import destroy from 'src/modules/vip/destroy/vipDestroyReducers';
import importerReducer from 'src/modules/vip/importer/vipImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
