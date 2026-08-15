import list from 'src/modules/notification/list/notificationListReducers';
import form from 'src/modules/notification/form/notificationFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,

});
