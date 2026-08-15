import list from 'src/modules/record/list/recordListReducers';
import form from 'src/modules/record/form/recordFormReducers';
import { combineReducers } from 'redux';
export default combineReducers({
  list,
  form,
});
