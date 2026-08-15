import list from 'src/modules/depositMethod/list/depositMethodReducers';
import form from 'src/modules/depositMethod/form/depositMethodFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
