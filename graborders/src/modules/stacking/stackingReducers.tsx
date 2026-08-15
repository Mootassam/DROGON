import list from 'src/modules/stacking/list/stackingListReducers';
import form from 'src/modules/stacking/form/stackingFormReducers';
import view from 'src/modules/stacking/view/stackingViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
