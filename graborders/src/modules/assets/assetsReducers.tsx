import list from 'src/modules/assets/list/assetsListReducers';
import form from 'src/modules/assets/form/assetsFormReducers';
import view from 'src/modules/assets/view/assetsViewReducers';

import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
