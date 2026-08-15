import list from 'src/modules/message/list/messageListReducers';
import form from 'src/modules/message/form/messageFormReducers';
import view from 'src/modules/message/view/messageViewReducers';

import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
