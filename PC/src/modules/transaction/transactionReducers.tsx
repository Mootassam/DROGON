import list from 'src/modules/transaction/list/transactionListReducers';
import form from 'src/modules/transaction/form/transactionFormReducers';
import { combineReducers } from 'redux';
export default combineReducers({
  list,
  form,

});
