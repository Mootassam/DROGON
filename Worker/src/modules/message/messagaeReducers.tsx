import list from 'src/modules/message/list/messageListReducers';
import form from 'src/modules/message/form/messageFormReducers';
import view from 'src/modules/message/view/messageViewReducers';
import destroy from 'src/modules/message/destroy/messageDestroyReducers';
import importerReducer from 'src/modules/message/importer/messageImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
