import list from 'src/modules/transaction/list/transactionListReducers';
import form from 'src/modules/transaction/form/transactionFormReducers';
import view from 'src/modules/transaction/view/transactionViewReducers';
import destroy from 'src/modules/transaction/destroy/transactionDestroyReducers';
import importerReducer from 'src/modules/transaction/importer/transactionImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
