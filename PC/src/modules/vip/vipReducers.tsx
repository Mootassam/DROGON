import list from 'src/modules/vip/list/vipListReducers';
import form from 'src/modules/vip/form/vipFormReducers';
import view from 'src/modules/vip/view/vipViewReducers';

import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
