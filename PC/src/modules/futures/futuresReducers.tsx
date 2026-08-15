import list from 'src/modules/futures/list/futuresListReducers';
import form from 'src/modules/futures/form/futuresFormReducers';
import view from 'src/modules/futures/view/futuresViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
